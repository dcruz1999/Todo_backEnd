import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthUserDto } from './dto/create-auth_user.dto';
import { Model } from 'mongoose';
import { AuthUser } from './entities/auth_user.entity';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { JwtPayload } from './interfaces/jwt-payload.interfaces';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthUserService {
  constructor(
    @InjectModel(AuthUser.name)
    private readonly AuthModel: Model<AuthUser>,
    private readonly jwtService: JwtService,
  ) { }

  async create(createAuthUserDto: CreateAuthUserDto) {

    try {
      const { password, ...userData } = createAuthUserDto;

      const authcreate =await this.AuthModel.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });
      delete authcreate.password
      return { authcreate };

    } catch (error) {
      throw new BadRequestException(error.datail)
    }
  }

  async login(LoginDto: LoginDto){
    const {email, password} = LoginDto

    const userAuth= await this.AuthModel.findOne(
      {email},
      {email:1, password:1}
    )
    if(!userAuth) throw new UnauthorizedException(`Credential are not valid ${email}`)

   if(!bcrypt.compareSync(password, userAuth.password))throw new UnauthorizedException(`Crediantial are not valid ${password}`)  

   return{
    userAuth,
    token: this.getJwtToken({email:userAuth.email})
   } 

  }






  async newDefaul() {
    const password="Welcome123!";
    const crateTodo=await this.AuthModel.create({
      email: "admin@abatechnology.com",
      password:bcrypt.hashSync(password, 10),
      fullname: "Admin"
  
    })
    return {
      crateTodo
    }
  }
  private getJwtToken(payload: JwtPayload){
    const token=this.jwtService.sign(payload)
    return token
  }

}
