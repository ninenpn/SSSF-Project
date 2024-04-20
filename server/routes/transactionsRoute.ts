import express, { Request, Response } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import Transaction from '../models/transactionsModel';
import User from '../models/userModel';

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

export default router;