import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';

import { UserService } from './user.service';
import { TaskService } from './task.service';

export const SERVICES: Provider[] = [UserService, TaskService];
