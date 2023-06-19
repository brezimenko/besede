import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {
    this.repo = repo;
  }

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ id });
  }

  find(email: string) {
    return this.repo.findBy({email});
  }

  findOneByEmail(email: string) {
    return this.repo.findOneBy({email});
  }

  async updateAvatar(id: number, avatarFile: Express.Multer.File) {
    const data = avatarFile.buffer.toString('base64');
    const avatar = `data:${avatarFile.mimetype};base64,${data}`;
    return this.repo.update(id, { avatar });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      return new NotFoundException('User not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      return new NotFoundException('User not found');
    }
    return this.repo.remove(user);
  }
}
