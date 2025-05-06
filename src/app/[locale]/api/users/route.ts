// app/api/users/route.ts (or pages/api/users.ts if using pages dir)
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const users = await clerkClient.users.getUserList({
      limit: 100, // Optional: max per page (default is 10, max is 100)
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
