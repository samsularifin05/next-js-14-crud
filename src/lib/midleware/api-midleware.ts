import { verifySignature, verifyTokenAsync } from "../jwt";
import { NextRequest, NextResponse } from "next/server";

export const apiMidleware = async (request: NextRequest) => {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  const signature = request.headers.get("Signature");

  if (request.nextUrl.pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/api/")) {
    if (!signature) {
      return new NextResponse(
        JSON.stringify({ message: "Invalide Signature", status: 401 }),
        {
          headers: { "Content-Type": "application/json" },
          status: 401
        }
      );
    }
    if (!token) {
      return new NextResponse(
        JSON.stringify({ message: "Unauthorized", status: 401 }),
        {
          headers: { "Content-Type": "application/json" },
          status: 401
        }
      );
    }

    try {
      const result = await verifyTokenAsync(token);

      if (!result.isValid) {
        return new NextResponse(
          JSON.stringify({ message: "Invalid Token", status: 401 }),
          {
            headers: { "Content-Type": "application/json" },
            status: 401
          }
        );
      }

      // Verify the signature
      const isSignatureValid = await verifySignature(token, signature);

      if (!isSignatureValid) {
        return new NextResponse(
          JSON.stringify({ message: "Invalid Signature", status: 401 }),
          {
            headers: { "Content-Type": "application/json" },
            status: 401
          }
        );
      }

      return NextResponse.next();
    } catch (error) {
      console.error("Middleware error:", error);
      return new NextResponse(
        JSON.stringify({ message: "Internal Server Error", status: 500 }),
        {
          headers: { "Content-Type": "application/json" },
          status: 500
        }
      );
    }
  }
};
