import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const cookie = req.cookies.get("token");
  if (cookie == null) {
    return NextResponse.redirect("http://localhost:3000/login");
  }
}

export const config = {
  matcher: "/",
};
