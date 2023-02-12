import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { UserDao } from '../dao';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(private userDao: UserDao) {}

  async login(userDto: UserDto) {
    const existingUser = await this.userDao.findOneByEmail(userDto.email);
    if (!existingUser) {
      throw new Error('there is no user with that email');
    }
    const isPassMatching = bcrypt.compare(userDto.pass, userDto.pass);
    if (!isPassMatching) {
      throw new Error('try again');
    }
    return jwt.sign(existingUser, process.env.JWT_SECRET);
  }

  async register(userDto: UserDto) {
    const existingUser = await this.userDao.findOneByEmail(userDto.email);
    if (existingUser) {
      throw new Error('email is already taken');
    }
    const encryptedPass = await bcrypt.hash(userDto.pass, 10);
    await this.userDao.create({ ...userDto, pass: encryptedPass });
    return;
  }
}
