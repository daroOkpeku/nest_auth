import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from 'src/UserModel/UserModel';
import * as bcrypt from "bcrypt";
// import bcrypt from 'bcryptjs';
import * as jwt from "jsonwebtoken"
@Injectable()
export class UsersService {
    constructor(@InjectModel(UserModel) private readonly userModel: typeof UserModel ){}


   async createUsers(data:{name:string, email:string, password:string}){
      this.userModel.create(data)
      return {'message':"successful registered"}
    }



   async createjwt_token(user:any){
    return   jwt.sign(user, 'NEST', { expiresIn: 172800 })
    }

    async loginUsers(data:{email:string, password:string}){
     
        let user = await this.userModel.findOne({
            where:{email:data.email},
           raw:true
        })
      
      if(user){
       
        // console.log('bcrypt.compare:', bcrypt.compare);
          const compardpass = await bcrypt.compare(data.password, user.password);
        //    console.log("compare",compardpass)
           if (!compardpass) {
            throw new UnauthorizedException('Invalid password');
          }

    

         let token = await this.createjwt_token(user)


         return {
            "message":'login successful',
            "token":token,
            'data':user
         }


      }

    }
}
