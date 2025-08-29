import mongoose, { Schema, Document, models } from "mongoose";

export interface IComplaint extends Document {
    name: string;
    email: string;
    message: string;
    status: "pending" | "resolved";
    createdAt: Date;
}

const ComplaintSchema = new Schema<IComplaint>(
    {
        name: { 
            type: String, 
            required: true 
        },
        email: { 
            type: String, 
            required: true 
        },
        message: { 
            type: String, 
            required: true 
        },
        status: { 
            type: String, 
            enum: ["pending", "in-progress", "resolved"], 
            default: "pending" 
        },
        priority: { 
            type: String, 
            enum: ["low", "medium", "high"], 
            default: "medium" 
        },
        category: { 
            type: String, 
            enum: ["service", "product", "billing", "other"], 
            default: "other" 
        },
        adminNotes: { 
            type: String 
        },
    },
    { timestamps: true }
);

const Complaint =
    models.Complaint || mongoose.model<IComplaint>("Complaint", ComplaintSchema);

export default Complaint;
