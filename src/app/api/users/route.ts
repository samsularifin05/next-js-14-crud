// // src/app/api/users/route.ts

import { ResponseDto } from "@/lib";
import UserService from "./service";

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();

    if (!name || !email) {
      return ResponseDto(`Email dan Name is required`, 500);
    }
    const newUser = await UserService.createUser({ name, email });
    return ResponseDto("Data Berhasil disimpan", 200, newUser);
  } catch (error) {
    return ResponseDto(`${error}`, 500);
  }
}

export async function GET(request: Request) {
  try {
    const users = await UserService.getAllUsers();
    return ResponseDto("Data Tersedia", 200, users);
  } catch (error) {
    return ResponseDto(`${error}`, 500);
  }
}
