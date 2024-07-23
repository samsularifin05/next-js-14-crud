/* eslint-disable import/no-anonymous-default-export */
import { User } from "../entities";
import UserRepository from "../repository";
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

  async createUser(data: Partial<User>) {
    return await UserRepository.create(data);
  }

  async updateUser(id: number, data: Partial<User>) {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return await UserRepository.updateUser(id, data);
  }

  async deleteUser(id: number) {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return await UserRepository.deleteUser(id);
  }
}

export default new UserService();
