import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthUserService } from './auth_user.service';
import { CreateAuthUserDto } from './dto/create-auth_user.dto';
import { UpdateAuthUserDto } from './dto/update-auth_user.dto';
import { LoginDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthUserController {
  constructor(private readonly authUserService: AuthUserService) {}

  @Post('register')
  create(@Body() createAuthUserDto: CreateAuthUserDto) {
    return this.authUserService.create(createAuthUserDto);
  }

  @Post('login')
  loginUser(@Body() LoginDto: LoginDto){
    return this.authUserService.login(LoginDto)
  }

  @Post('defaul')
  defaul( ) {
    return this.authUserService.newDefaul();
  }
  
}
