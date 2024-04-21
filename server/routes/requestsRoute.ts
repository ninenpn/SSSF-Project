import express, { Request, Response } from 'express';
import RequestModel from '../models/requestsModel';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// Fetch all requests by sender or receiver
router.post('/get-all-request-by-user', authMiddleware, async (req: Request, res: Response) => {
    try {
        const requests = await RequestModel.find({ sender: req.body.userId });
        res.status(200).json({
            message: 'Requests fetched successfully',
            data: requests,
            success: true,
        });
    } catch (error: any) {
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

export default router;