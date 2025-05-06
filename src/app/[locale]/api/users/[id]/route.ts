// File path: app/[locale]/api/users/[id]/route.ts

import { clerkClient } from "@clerk/clerk-sdk-node";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: any }) {
  try {
    const userId = params.id;
    // You can use params.locale if needed for internationalization
    const user = await clerkClient.users.getUser(userId);
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Failed to get user:", error);
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
}
