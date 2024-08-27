import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class AuthUser {
  @Prop()
  id: string;
  @Prop()
  email: string;
  @Prop({ select: false })
  password: string;
  @Prop()
  fullname: string;
  @Prop({ default: true })
  isActive: boolean;
}

export const AuthSchema = SchemaFactory.createForClass(AuthUser);
