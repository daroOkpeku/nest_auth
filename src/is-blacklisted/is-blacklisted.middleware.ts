import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BlacklistModel } from 'src/UserModel/BlacklistedModel'; 
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class IsBlacklistedMiddleware implements NestMiddleware {
   constructor(@InjectModel(BlacklistModel) private readonly blacklistModel: typeof BlacklistModel ){}
 async use(req: Request, res:Response , next:NextFunction) {
  // console.log("Middleware triggered");
    const token = req.headers.authorization?.split(' ')[1]
    if(token){
      // console.log("Token from middleware", token);
       const blacklidtted =  await this.blacklistModel.findOne({
          where:{token:token},
        });
       
        if(blacklidtted){
          console.log("hello", 'this is true')
          throw new UnauthorizedException('Token is blacklisted. Please log in again.');
        }
    }
    next();
  }
}
