import { getId, ResponseDto } from "@/lib";
import UserService from "../service";

export async function PUT(request: Request) {
  try {
    const id = getId(request);
    const { name, email } = await request.json();

    if (!id) {
      return ResponseDto(`Id Notefound`, 400);
    }

    const existingUser = await UserService.getUserById(id);

    if (!existingUser) {
      return ResponseDto("Usernote found", 400);
    }
    const updatedUser = await UserService.updateUser(id, { name, email });
    return ResponseDto("Data Berhasil di edit", 200, updatedUser);
  } catch (error) {
    return ResponseDto(`${error}`, 500);
  }
}
export async function DELETE(request: Request) {
  try {
    const id = getId(request);
    if (!id) {
      return ResponseDto(`Id Notefound`, 400);
    }

    await UserService.deleteUser(Number(id));

    return new Response("Berhasil di hapus", {
      headers: { "Content-Type": "application/json" },
      status: 200
    });
  } catch (error) {
    return ResponseDto(`${error}`, 500);
  }
}

export async function GET(request: Request) {
  try {
    const id = getId(request);
    if (id) {
      const users = await UserService.getUserById(id);
      return ResponseDto("Data Tersedia", 200, users);
    }
    const users = await UserService.getAllUsers();
    return ResponseDto("Data Tersedia", 200, users);
  } catch (error) {
    return ResponseDto(`${error}`, 500);
  }
}
