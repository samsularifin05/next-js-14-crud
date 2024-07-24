// typeorm.config.ts

import { DataSource } from "typeorm";
import { User } from "../users/entities";

// Load environment variables from .env file
import * as dotenv from "dotenv";
dotenv.config();

const isPostgres = process.env.DATABASE_PROVIDER === "postgres";

export const AppDataSource = new DataSource({
  type: isPostgres ? "postgres" : "mysql",
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || "5432"),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User],
  synchronize: true // Set to false in production
});
