import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { AuthUserModule } from './auth_user/auth_user.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://dcruz:OLb1Kep9HBe4M2pf@cluster0.nrvl7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    AuthUserModule,
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
