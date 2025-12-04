import { NODE_URL } from "@/env.config";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(`${NODE_URL}/api/categories`);
  const data = await res.json();

  return NextResponse.json(data);
}
