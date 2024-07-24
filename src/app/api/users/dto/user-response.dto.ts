import { mapItems } from "@/lib";
import { User } from "../entities";

export type MappedUser = {
  id: number;
  username: string;
  email: string;
};

export const mapUser = (user: User): MappedUser => ({
  id: user.id,
  username: user.username,
  email: user.email
});

export const mapUsers = (users: User | User[]): MappedUser[] => {
  return mapItems(users, mapUser);
};
