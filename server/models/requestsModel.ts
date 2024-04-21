import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "pending",
    },
}, { timestamps: true } );

const Request = mongoose.model("requests", requestSchema);

export default Request;