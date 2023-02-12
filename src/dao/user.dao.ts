import { Document, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User } from '../schemas/user.schema';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserDao {
  constructor(
    @InjectModel(User.name)
    private model: Model<User & Document>,
  ) {}

  async create(userDto: UserDto): Promise<User | null> {
    return this.model.create(userDto);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.model.findOne({ email }).lean();
  }
}
