import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Headers,
  Param,
} from '@nestjs/common';

import { TaskService } from '../services/task.service';
import { Auth } from '../decorator/auth.decorator';
import { TaskDto } from '../dto/task.dto';

@Controller('/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/')
  @HttpCode(200)
  async getTasks(@Headers('token') token: string, @Auth() auth) {
    try {
      const data = await this.taskService.getTasks(auth);
      return {
        success: true,
        list: data,
      };
    } catch (err) {
      return {
        success: false,
        error: err.message,
      };
    }
  }

  @Post('/')
  @HttpCode(200)
  async addTask(
    @Headers('token') token: string,
    @Auth() auth,
    @Body() body: TaskDto,
  ) {
    try {
      const data = await this.taskService.addTask(body, auth);
      return {
        success: true,
        list: data,
      };
    } catch (err) {
      return {
        success: false,
        error: err.message,
      };
    }
  }

  @Delete('/:taskId')
  @HttpCode(200)
  async deleteTaskById(
    @Headers('token') token: string,
    @Auth() auth,
    @Param('taskId') taskId: string,
  ) {
    try {
      await this.taskService.deleteTask(taskId, auth);
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
}
