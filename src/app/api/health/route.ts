import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";

export async function GET() {
  try {
    // Test database connection
    await dbConnect();
    
    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || "1.0.0",
      environment: process.env.NODE_ENV || "development",
      database: "connected",
      uptime: process.uptime()
    });
  } catch (error) {
    return NextResponse.json({
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      error: "Database connection failed",
      uptime: process.uptime()
    }, { status: 503 });
  }
}
