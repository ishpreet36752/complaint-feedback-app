import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Complaint from "@/models/Complaint";
import { requireAuth } from "@/app/api/middleware";
import { sendStatusUpdateEmail } from "@/lib/mailer";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = requireAuth(request, ["user", "admin"]);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    await dbConnect();
    const body = await request.json();
    const { id } = await params;
    
    const existingComplaint = await Complaint.findById(id);
    if (!existingComplaint) {
      return NextResponse.json(
        { success: false, error: "Complaint not found" },
        { status: 404 }
      );
    }
    console.log(existingComplaint);
    if (authResult.role === "user" && existingComplaint.userId.toString() !== authResult.id) {
      return NextResponse.json(
        { success: false, error: "Access denied" },
        { status: 403 }
      );
    }

    // Store old status for email notification
    const oldStatus = existingComplaint.status;
    
    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    // Send email notification if status was updated (admin only)
    if (authResult.role === "admin" && body.status && body.status !== oldStatus) {
      try {
        await sendStatusUpdateEmail(complaint, oldStatus);
        console.log("Email notification sent for status update");
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({ success: true, data: complaint });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update complaint" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = requireAuth(request, ["user", "admin"]);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    await dbConnect();
    const { id } = await params;
    
    const existingComplaint = await Complaint.findById(id);
    if (!existingComplaint) {
      return NextResponse.json(
        { success: false, error: "Complaint not found" },
        { status: 404 }
      );
    }

    if (authResult.role === "user" && existingComplaint.userId.toString() !== authResult.id) {
      return NextResponse.json(
        { success: false, error: "Access denied" },
        { status: 403 }
      );
    }
    
    const complaint = await Complaint.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Complaint deleted" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete complaint" },
      { status: 500 }
    );
  }
}
