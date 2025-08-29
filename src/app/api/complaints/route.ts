import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Complaint from "@/models/Complaint";

export async function GET() {
  try {
    await connectDB();
    const complaints = await Complaint.find({});
    return NextResponse.json({ success: true, data: complaints });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch complaints" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    const complaint = new Complaint(body);
    await complaint.save();
    
    return NextResponse.json(
      { success: true, data: complaint },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create complaint" },
      { status: 500 }
    );
  }
}
