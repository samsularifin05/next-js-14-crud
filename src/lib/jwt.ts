import { jwtVerify, SignJWT } from "jose";
import { sha256 } from "js-sha256";

// Replace with your actual secret
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const APP_KEY = process.env.API_KEY;
const SECRETKEY = process.env.SECRET_KEY;

// Function to create a token
export async function generateToken(payload: object): Promise<string> {
  const iat = Math.floor(Date.now() / 1000); // Issued at time
  const exp = iat + 60 * 60; // Token expires in 1 hour

  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<object> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    console.error("Token verification failed:", error);
    throw new Error("Invalid token");
  }
}
// Asynchronous function to verify the token
export async function verifyTokenAsync(token: string) {
  try {
    const decodedPayload = await verifyToken(token);
    return { isValid: true, payload: decodedPayload };
  } catch (error) {
    console.error("Token verification failed:", error);
    return { isValid: false, payload: null };
  }
}

export const computeSignature = (
  apiKey: string,
  secretKey: string,
  accessToken: string,
  timestamp: string
) => {
  const payload = apiKey + secretKey + accessToken + timestamp;
  const signature = sha256.hmac(secretKey, payload);
  return signature;
};

export async function verifySignature(
  signature: string,
  timestamp: string,
  accessToken: string,
  tolerance: number
): Promise<boolean> {
  try {
    const headerDate = new Date(timestamp);
    const currentDate = new Date();
    const diffDateSecond =
      (currentDate.getTime() - headerDate.getTime()) / 1000;

    if (diffDateSecond < -tolerance || diffDateSecond > tolerance) {
      return false;
    }
    const expectedSignature = computeSignature(
      `${APP_KEY}`,
      `${SECRETKEY}`,
      accessToken,
      timestamp
    );

    return signature === expectedSignature;
  } catch (error) {
    console.error("Token verification failed:", error);
    throw new Error("Invalid token " + error);
  }
}
