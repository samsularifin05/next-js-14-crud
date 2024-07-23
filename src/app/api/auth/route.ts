import { generateSignature, ResponseDto, verifySignature } from "@/lib";
import { generateToken, verifyToken } from "@/lib";

export async function GET(request: Request) {
  try {
    const payload = { userId: 123, email: "user@example.com" };

    // Generate a token
    const token = await generateToken(payload);
    const timestamp = new Date().toISOString();
    const signature = generateSignature(token);

    const decodedPayload = await verifyToken(token);
    const isSignature = await verifySignature(token, signature);
    return ResponseDto("Data Tersedia ", 200, {
      ...decodedPayload,
      token: token,
      signature: signature,
      isSignature: isSignature
    });
  } catch (error) {
    return ResponseDto(`${error}`, 500);
  }
}
