import { Injectable } from '@nestjs/common';

import { TaskDao } from '../dao';
import { User } from '../schemas/user.schema';
import { TaskDto } from '../dto/task.dto';

@Injectable()
export class TaskService {
  constructor(private taskDao: TaskDao) {}

  getTasks(user: User) {
    return this.taskDao.findUserTasks(user._id);
  }

  async addTask(dto: TaskDto, user: User) {
    await this.taskDao.createTask({ ...dto, user_id: user._id });
    return this.taskDao.findUserTasks(user._id);
  }

  async deleteTask(taskId, user) {
    const task = await this.taskDao.findTaskId(taskId);
    if (task && task.user_id.toString() === user._id) {
      await this.taskDao.deleteTaskById(taskId);
      return;
    }
    throw new Error("You don't have access");
  }
}
