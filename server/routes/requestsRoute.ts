import express, { Request, Response } from 'express';
import RequestModel from '../models/requestsModel';
import authMiddleware from '../middlewares/authMiddleware';
import request from '../models/requestsModel';
import User from '../models/userModel';
import Transaction from '../models/transactionsModel';

const router = express.Router();

// Fetch all requests by sender or receiver
router.post('/get-all-request-by-user', authMiddleware, async (req: Request, res: Response) => {
    try {
        const userId = req.body.userId;

        const requests = await RequestModel.find({
            $or: [{ sender: userId }, { receiver: userId }],
        })
        .sort({ createdAt: -1 });

        res.status(200).json({
            message: 'Requests fetched successfully',
            data: requests,
            success: true,
        });
    } catch (error: any) {
        console.error('Failed to fetch requests:', error);
        res.status(500).json({
            message: 'Failed to fetch requests',
            success: false,
            error: error.message,
        });
    }
});

// Send a new request
router.post('/send-request', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { receiver, amount, description } = req.body;

        const newRequest = new RequestModel({
            sender: req.body.userId,
            receiver,
            amount,
            description,
        });

        await newRequest.save();

        res.status(201).json({
            data: newRequest,
            message: "Request sent successfully",
            success: true
        });
    } catch (error: any) {
        console.error('Failed to send request:', error);
        res.status(500).json({
            message: 'Failed to send request',
            success: false,
            error: error.message
        });
    }
});

// Update request status
router.post('/update-request-status', authMiddleware, async (req: Request, res: Response) => {
    try {
        if(req.body.status === 'accepted') {
            const transaction = new Transaction({
                sender: req.body.receiver,
                receiver: req.body.sender,
                amount: req.body.amount,
                reference: req.body.description,
                status: 'completed'
            });
            await transaction.save();
            
            await User.findByIdAndUpdate(req.body.sender, {$inc: {balance: req.body.amount}});
            await User.findByIdAndUpdate(req.body.receiver, {$inc: {balance: -req.body.amount}});
        }
            await request.findByIdAndUpdate(req.body._id, {status: req.body.status});

        res.send({
            data: null,
            message: 'Request status updated successfully',
            success: true
        });
    } catch (error: any) {
        res.send({
            data: error,
            message: 'Failed to update request status',
            success: false
        });
    }
});

export default router;