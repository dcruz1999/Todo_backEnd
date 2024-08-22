import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './entities/todo.entity';
import { AuthUserModule } from 'src/auth_user/auth_user.module';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
  imports:[
    MongooseModule.forFeature([
      {
        name:Todo.name,
        schema: TodoSchema
      }
    ]),
    AuthUserModule
  ]
})
export class TodoModule {}
