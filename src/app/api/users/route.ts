"use server";
import { ResponseDto } from "@/lib";
import UserService from "./service";
import { mapUsers } from "./dto/user-response.dto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newUser = await UserService.createUser(body);
    const mappedUsers = mapUsers(newUser);
    return ResponseDto("Data Berhasil disimpan", 200, mappedUsers);
  } catch (error) {
    return ResponseDto(`${error}`, 500);
  }
}

export async function GET() {
  try {
    const users = await UserService.getAllUsers();
    const mappedUsers = mapUsers(users);
    return ResponseDto("Data Tersedia", 200, mappedUsers);
  } catch (error) {
    return ResponseDto(`${error}`, 500);
  }
}
