// src/lib/repositories/BaseRepo.ts

import { AppDataSource } from "@/app/api/db/typeorm.config";
import { DataSource, DeepPartial, ObjectLiteral, Repository } from "typeorm";

class BaseRepository<T extends ObjectLiteral> {
  private repository: Repository<T>;

  constructor(private dataSource: DataSource, private entity: new () => T) {
    this.repository = this.dataSource.getRepository(this.entity);
  }

  async findAll(): Promise<T[]> {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    return this.repository.find();
  }

  async findById(id: number): Promise<T | null> {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    return this.repository.findOneBy({ id } as any); // Adjust based on your entity key type
  }

  async create(data: DeepPartial<T>): Promise<T> {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async update(id: number, data: DeepPartial<T>): Promise<T> {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const entity = await this.findById(id);
    if (!entity) {
      throw new Error("Entity not found");
    }
    Object.assign(entity, data);
    return this.repository.save(entity);
  }

  async delete(id: number): Promise<void> {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new Error("Entity not found");
    }
  }
}

export default BaseRepository;
