import { UserDao } from './user.dao';
import { TaskDao } from './task.dao';

export { UserDao, TaskDao };

export const DAO_PROVIDERS = [UserDao, TaskDao] as const;
