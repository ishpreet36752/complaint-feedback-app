import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function requireAuth(req: NextRequest, allowedRoles: ("user" | "admin")[]) {
  const token = req.cookies.get("token")?.value;
  
  if (!token) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
  }

  if (!allowedRoles.includes(decoded.role as "user" | "admin")) {
    return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
  }

  return decoded;
}
