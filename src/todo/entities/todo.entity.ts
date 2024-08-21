import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
export enum TodoStatus{
    PENDING='PENDIN',
    IN_PROGRESS='IN_PROGRESS',
    COMPLETE='COMPLETE'
}


@Schema()
export class Todo extends Document {

    @Prop()
    title:string

    @Prop()
    description: string

    @Prop()
    dueDate:string

    @Prop({default: TodoStatus.PENDING})
    status: TodoStatus
}

export const TodoSchema = SchemaFactory.createForClass(Todo)
