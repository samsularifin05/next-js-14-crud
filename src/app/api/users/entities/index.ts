// src/entities/User.ts

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("tm_user")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  username!: string;

  @Column({ nullable: true })
  password!: string;

  @Column({ unique: true })
  email!: string;
}
