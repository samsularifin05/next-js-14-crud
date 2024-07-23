// src/lib/helpers/responseHelper.ts

export function ResponseDto<T>(
  message: string,
  status: number,
  data?: T | T[]
): Response {
  return new Response(JSON.stringify({ message, data, status }), {
    headers: { "Content-Type": "application/json" },
    status
  });
}
