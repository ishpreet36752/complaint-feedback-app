import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Complaint from "@/models/Complaint";
import { requireAuth } from "@/app/api/middleware";
import { sendNewComplaintEmail } from "@/lib/mailer";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const authResult = requireAuth(request, ["user", "admin"]);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    let complaints;
    if (authResult.role === "admin") {
      complaints = await Complaint.find().populate("userId", "name email");
    } else {
      complaints = await Complaint.find({ userId: authResult.id });
    }

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
    const authResult = requireAuth(request, ["user", "admin"]);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    await dbConnect();
    const body = await request.json();

    const complaint = new Complaint({
      ...body,
      userId: authResult.id,
    });
    await complaint.save();

    try {
      await sendNewComplaintEmail(complaint);
      console.log("Email notification sent for new complaint");
    } catch (emailError) {
      console.error("Failed to send email notification:", emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      { success: true, data: complaint },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Complaint creation error:", error);
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { 
          success: false, 
          error: "Validation failed", 
          details: validationErrors 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: "Failed to create complaint" },
      { status: 500 }
    );
  }
}
