import { createConnection, getRepository, Repository } from "typeorm";
import { User } from "../models/User";

class UserRepo {
  repo: Repository<User>;
  constructor() {
    this.repo = getRepository(User);
  }

  async getOne(id: string): Promise<User | undefined> {
    return await this.repo.findOne(id);
  }

  async saveOne(user: User): Promise<User> {
    return await this.repo.save(user);
  }
}

export const userRepo = new UserRepo();
