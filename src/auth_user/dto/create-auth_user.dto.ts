import { IsEmail, IsString, MaxLength, MinLength } from "class-validator"

export class CreateAuthUserDto {


    @IsString()
    @IsEmail()
    email: string


    @IsString()
    @MinLength(6)
    @MaxLength(50)
    password: string


    @IsString()
    @MinLength(1)
    fullname: string


}
