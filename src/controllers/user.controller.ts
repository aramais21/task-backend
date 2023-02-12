import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { UserService } from '../services/user.service';
import { UserDto } from '../dto/user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @HttpCode(200)
  async register(@Body() body: UserDto) {
    try {
      await this.userService.register(body);
      return {
        success: true,
      };
    } catch (err) {
      return {
        success: false,
        error: err.message,
      };
    }
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() body: UserDto) {
    try {
      const token = await this.userService.login(body);
      return {
        success: true,
        token,
      };
    } catch (err) {
      return {
        success: false,
        error: err.message,
      };
    }
  }
}
