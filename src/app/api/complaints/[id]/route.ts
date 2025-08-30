import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Complaint from "@/models/Complaint";
import { requireAuth } from "@/app/api/middleware";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = requireAuth(request, ["admin"]);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    await dbConnect();
    const body = await request.json();
    const { id } = await params;
    
    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!complaint) {
      return NextResponse.json(
        { success: false, error: "Complaint not found" },
        { status: 404 }
      );
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
    const authResult = requireAuth(request, ["admin"]);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    await dbConnect();
    const { id } = await params;
    
    const complaint = await Complaint.findByIdAndDelete(id);

    if (!complaint) {
      return NextResponse.json(
        { success: false, error: "Complaint not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Complaint deleted" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete complaint" },
      { status: 500 }
    );
  }
}
