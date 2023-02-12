import { Prop, Schema } from '@nestjs/mongoose';

import { BaseSchema } from './base.schema';

@Schema({
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated',
  },
  toObject: {
    getters: true,
  },
  collection: 'users',
})
export class User extends BaseSchema {
  @Prop({ unique: true, index: true })
  email: string;

  @Prop()
  pass: string;
}
