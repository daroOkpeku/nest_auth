import { Body, Controller, Post, ValidationPipe, Request, UseGuards, Get, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser } from 'src/validation/create-users-dto';
// import * as bcrypt from "bcrypt"
// import bcrypt from "bcryptjs"
import * as bcrypt from "bcrypt";
import { Login } from 'src/validation/login-users.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';

// npm i bcrypt
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {}
  
@Post('register')
async CreateUser(@Body(new ValidationPipe()) CreateUser:CreateUser){
  // @Post('register') base_url/users/register
    try {
      const hashed = await bcrypt.hash(CreateUser.password, 10)
      const user = {
        name:CreateUser.name,
        email:CreateUser.email,
        password:hashed
      }
    return await this.usersService.createUsers(user)
    } catch (error) {
     throw new Error('somthing went wrong');
    }
  }



@Post('login')
  async LoginUser(@Body(new ValidationPipe()) loginUser:Login){
    //  return loginUser
    
  return   await this.usersService.loginUsers(loginUser);
  }

@UseGuards(AuthGuard('jwt'))
@Get('me')
 async getProfile(@Request() req:any){
// @UseGuards(AuthGuard('jwt')) this is protecting this route just like ->midddleware('auth')
    //      const token = req.headers.authorization?.split(' ')[1]
    //  if (token && (await this.authService.isTokenBlacklisted(token))) {
    //       throw new UnauthorizedException('Token has been logged out');
    //     }else{
          return {
            message:'protected user profile',
            data:req.user
          }
        //}
  
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  // middware()
  async logout(@Request() req:any){
    const token = req.headers.authorization?.split(' ')[1]
    if(token){
      await this.authService.blacklistToken(token);
      // return { message: 'Logged out successfully' };
    }
    return { message: 'Logged out successfully' };
  }
}
