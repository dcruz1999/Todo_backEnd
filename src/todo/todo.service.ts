import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './entities/todo.entity';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class TodoService {

  constructor (
    @InjectModel(Todo.name)
    private readonly TodoModel: Model<Todo>
  ){}


  async create(createTodoDto: CreateTodoDto) {
    const crateTodo=await this.TodoModel.create(createTodoDto)
    return {
      crateTodo
    }
  }

  async findAll() {
    const viewTodo =await this.TodoModel.find({}).select('-__v');
    return viewTodo
  }

  async findOne(id: string) {
    let users: Todo

    if (!users && isValidObjectId(id)) {
      users = await this.TodoModel.findById(id)
    }
    if (!users) throw new NotFoundException('User not found')
    return users
  }



  async update(id: string, updateTodoDto: UpdateTodoDto) {
    try {
      const users = await this.findOne(id)
      if (updateTodoDto.title)
        updateTodoDto.title = updateTodoDto.title.toLowerCase()
      await users.updateOne(updateTodoDto, {new: true})
     
      return{
       ...users.toJSON(), ...updateTodoDto
      }
   } catch (error) {
      this.handleError(error)
   }
  }

  async remove(id: string) {
    try {
      const user =await this.TodoModel.findByIdAndDelete(id).exec()
      if (!user) throw new NotFoundException('User not found')

      return user
    } catch (error) {
      console.error(error)
      this.handleError(error)
    }  
  }


  async handleError(error:any){
    if(error.code===11000){
      throw new BadRequestException('Task exists in db ')
    }
    throw new InternalServerErrorException(`Can't create Task - Check serler logs`)

  }


}
