import { Module } from '@nestjs/common';
import { AuthUserService } from './auth_user.service';
import { AuthUserController } from './auth_user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema, AuthUser } from './entities/auth_user.entity';

@Module({
  controllers: [AuthUserController],
  providers: [AuthUserService],
  imports:[
    MongooseModule.forFeature([
      {
        name: AuthUser.name,
        schema: AuthSchema
      }
    ])
  ]
})
export class AuthUserModule {}
