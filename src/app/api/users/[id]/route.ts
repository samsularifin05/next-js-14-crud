import { getId, ResponseDto } from "@/lib";
import UserService from "../service";
import { mapUsers } from "../dto/user-response.dto";

export async function PUT(request: Request) {
  try {
    const id = getId(request);
    const data = await request.json();
    const updatedUser = await UserService.updateUser(id, data);
    const mappedUsers = mapUsers(updatedUser);
    return ResponseDto("Data Berhasil di edit", 200, mappedUsers);
  } catch (error) {
    return ResponseDto(`${error}`, 500);
  }
}
export async function DELETE(request: Request) {
  try {
    const id = getId(request);
    await UserService.deleteUser(Number(id));
    return ResponseDto("Data Berhasil di hapus", 200);
  } catch (error) {
    return ResponseDto(`${error}`, 500);
  }
}

export async function GET(request: Request) {
  try {
    const id = getId(request);
    const users = await UserService.getUserById(id);
    const mappedUsers = mapUsers(users);
    return ResponseDto("Data Tersedia", 200, mappedUsers);
  } catch (error) {
    return ResponseDto(`${error}`, 500);
  }
}
