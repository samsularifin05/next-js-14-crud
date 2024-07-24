/* eslint-disable import/no-anonymous-default-export */
import BaseRepository from "@/lib/repositories";
import { User } from "../entities";
import { AppDataSource } from "../../config/typeorm.config";

class UserRepository extends BaseRepository<User> {
  constructor() {
    super(AppDataSource, User);
  }
}

export default new UserRepository();
