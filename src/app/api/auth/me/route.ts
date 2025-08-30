import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/app/api/middleware";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function GET(request: NextRequest) {
  try {
    const authResult = requireAuth(request, ["user", "admin"]);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    await dbConnect();
    
    // Get user details from database
    const user = await User.findById(authResult.id).select("-password");
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
