import express, { Request, Response } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import Transaction from '../models/transactionsModel';
import User from '../models/userModel';
import stripe from 'stripe';
import { v4 as uuid } from 'uuid';

const router = express.Router();

// Route for transferring funds
router.post('/transfer-funds', authMiddleware, async (req: Request, res: Response) => {
    try {
        const newTransaction = new Transaction(req.body);
        await newTransaction.save();

        // Deduct amount from sender's balance
        await User.findByIdAndUpdate(req.body.sender, {
            $inc: { balance: -req.body.amount }
        });

        // Add amount to receiver's balance
        await User.findByIdAndUpdate(req.body.receiver, {
            $inc: { balance: req.body.amount }
        });

        res.status(201).json({
            message: 'Transaction successful',
            data: newTransaction,
            success: true,
        });
    } catch (error) {
        console.error('Transaction failed:', error);
        res.status(500).json({
            message: 'Transaction failed',
            success: false,
        });
    }
});

// Route for verifying account
router.post('/verify-account', authMiddleware, async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ _id: req.body.receiver });
        if (user) {
            res.status(200).json({
                message: 'Account verified successfully',
                data: user,
                success: true,
            });
        } else {
            res.status(404).json({
                message: 'User not found',
                data: null,
                success: false,
            });
        }
    } catch (error) {
        console.error('Account verification failed:', error);
        res.status(500).json({
            message: 'Account verification failed',
            success: false,
        });
    }
});

// Route for fetching all transactions by user
router.post('/get-all-transactions-by-user', authMiddleware, async (req: Request, res: Response) => {
    try {
        const transactions = await Transaction.find({
            $or: [{ sender: req.body.userId }, { receiver: req.body.userId }],
        }).sort({ createdAt: -1 });
        res.status(200).json({
            message: 'Transactions fetched successfully',
            data: transactions,
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch transactions',
            success: false,
        });
    }
});

//Deposit funds using stripe
require('dotenv').config();
const stripeKey = process.env.stripe_key;

if (!stripeKey) {
    throw new Error('Stripe secret key not found in environment variables.');
}

const stripeClient = new stripe.Stripe(stripeKey);

router.post('/deposit-funds', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { token, amount } = req.body;

        const customer = await stripeClient.customers.create({
            email: token.email,
            source: token.id
        });

        const charge = await stripeClient.charges.create({
            amount: amount,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: 'Deposit funds to wallet'
        }, {
            idempotencyKey: uuid()
        });

        if (charge.status === 'succeeded') {
            const newTransaction = new Transaction({
                sender: req.body.userId,
                receiver: req.body.userId, // Assuming self-deposit
                amount: amount,
                type: 'deposit',
                reference: 'Card Deposit',
                status: 'completed'
            });
            await newTransaction.save();

            await User.findByIdAndUpdate(req.body.userId, {
                $inc: { balance: amount }
            });
            res.status(201).json({
                message: 'Deposit successful',
                data: newTransaction,
                success: true
            });
        } else {
            throw new Error('Payment processing failed');
        }

    } catch (error: any) {
        console.error('Deposit failed:', error);
        res.status(400).json({
            message: error.message || 'Deposit failed',
            success: false
        });
    }
});

export default router;