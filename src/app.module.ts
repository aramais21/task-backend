import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

import { MONGOOSE_PROVIDERS } from './schemas';
import { DAO_PROVIDERS } from './dao';
import { UserController } from './controllers/user.controller';
import { SERVICES } from './services';
import { TokenMiddleware } from './middleware/token.middleware';
import { TaskController } from './controllers/task.controller';

dotenv.config();

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_DB_URI)],
  controllers: [UserController, TaskController],
  providers: <Provider[]>[...MONGOOSE_PROVIDERS, ...DAO_PROVIDERS, ...SERVICES],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(TokenMiddleware).forRoutes('task');
  }
}
