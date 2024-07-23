/* eslint-disable import/no-anonymous-default-export */
import BaseRepository from "@/lib/repositories";
import { User } from "../entities";
import { AppDataSource } from "../../db/typeorm.config";

class UserRepository extends BaseRepository<User> {
  constructor() {
    super(AppDataSource, User);
  }

  async getAllUsers() {
    return this.findAll();
  }
  async getUserById(id: number) {
    const user = await this.findById(id);
    return user;
  }

  async createUser(data: Partial<User>) {
    return this.create(data);
  }

  async updateUser(id: number, data: Partial<User>) {
    return this.update(id, data);
  }

  async deleteUser(id: number) {
    return await this.delete(id);
  }
}

export default new UserRepository();
