import { Module } from '@nestjs/common';
import { AuthUserService } from './auth_user.service';
import { AuthUserController } from './auth_user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema, AuthUser } from './entities/auth_user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthUserController],
  providers: [AuthUserService, JwtStrategy],
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true 
    }),
    MongooseModule.forFeature([
      {
        name: AuthUser.name,
        schema: AuthSchema
      }
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '2h'
          }
        }
      }
    })
  ],
  exports: [MongooseModule, JwtStrategy, PassportModule, JwtModule]
})
export class AuthUserModule { }
