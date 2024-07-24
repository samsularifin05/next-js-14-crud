import { ResponseDto } from "@/lib";
import LoginService from "./service";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    let result = await LoginService.cekLogin(body);

    return ResponseDto("Data Tersedia", 200, result);
  } catch (error) {
    return ResponseDto(`${error}`, 500);
  }
}
