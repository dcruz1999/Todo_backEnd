import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { AuthUserModule } from './auth_user/auth_user.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/newtodo'),
    AuthUserModule,
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
