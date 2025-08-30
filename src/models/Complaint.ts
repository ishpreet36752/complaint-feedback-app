import mongoose, { Schema, Document, models } from "mongoose";

export interface IComplaint extends Document {
  title: string;
  description: string;
  category: "Product" | "Service" | "Support";
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "In Progress" | "Resolved";
  dateSubmitted: Date;
  userId: mongoose.Types.ObjectId;
}

const ComplaintSchema = new Schema<IComplaint>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Product", "Service", "Support"],
      required: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },
    dateSubmitted: {
      type: Date,
      default: Date.now,
    },
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    }, // 👈 new field
  },
  { timestamps: true }
);

if (models.Complaint) {
  delete models.Complaint;
}

const Complaint = mongoose.model<IComplaint>("Complaint", ComplaintSchema);

export default Complaint;
