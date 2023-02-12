import { Document, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Task } from '../schemas/task.schema';

@Injectable()
export class TaskDao {
  constructor(
    @InjectModel(Task.name)
    private model: Model<Task & Document>,
  ) {}

  async findUserTasks(userId): Promise<Task[] | null> {
    return this.model.find({ user_id: userId });
  }

  async createTask(task) {
    return this.model.create(task);
  }

  async findTaskId(taskId) {
    return this.model.findOne({ _id: taskId });
  }

  async deleteTaskById(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
