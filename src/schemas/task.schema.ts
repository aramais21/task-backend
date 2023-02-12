import { Prop, Schema } from '@nestjs/mongoose';
import { Schema as MongooseDefaultSchema } from 'mongoose';

import { BaseSchema } from './base.schema';
import { User } from './user.schema';

@Schema({
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated',
  },
  toObject: {
    getters: true,
  },
  collection: 'tasks',
})
export class Task extends BaseSchema {
  @Prop()
  title: string;

  @Prop()
  date: string;

  @Prop({
    required: true,
    ref: 'users',
    type: MongooseDefaultSchema.Types.ObjectId,
  })
  user_id: User;
}
