import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderName: {
        type: String,
        minlength: [2, "Name must contain at least 2 characters!"],
        required: true
    },
    subject: {
        type: String,
        minlength: [2, "Subject must contain at least 2 characters!"],
        required: true
    },
    message: {
        type: String,
        minlength: [2, "Message must contain at least 2 characters!"],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
