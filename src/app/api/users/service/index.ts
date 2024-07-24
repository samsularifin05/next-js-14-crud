/* eslint-disable import/no-anonymous-default-export */
import { generate, validateSchema } from "@/lib";
import UserRepository from "../repository";
import { CreateUserRequestDto } from "../dto/create-users-request.dto";
import { UpdateUserRequestDto } from "../dto/update-user-request.dto";

class UserService {
  async getAllUsers() {
    return UserRepository.findAll();
  }

  async getUserById(id: number) {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async createUser(body: CreateUserRequestDto) {
    let cekEmail = await UserRepository.findOne({ email: body.email });

    if (cekEmail?.email) {
      throw new Error("Email sudah terdaftar");
    }
    const { isValid, errors, data } = validateSchema<CreateUserRequestDto>(
      CreateUserRequestDto,
      body
    );

    if (!isValid) {
      throw new Error(errors);
    }

    if (data.password) {
      const hashedPassword = await generate(data.password);
      data.password = hashedPassword;
    }

    return await UserRepository.create(data);
  }

  async updateUser(id: number, body: UpdateUserRequestDto) {
    if (!id) {
      throw new Error("User not found");
    }
    const { isValid, errors, data } = validateSchema(
      UpdateUserRequestDto,
      body
    );
    if (!isValid) {
      throw new Error(errors);
    }
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return await UserRepository.update(id, data);
  }

  async deleteUser(id: number) {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return await UserRepository.delete(id);
  }
}

export default new UserService();
