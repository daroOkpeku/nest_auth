import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from '@nestjs/sequelize';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { BlacklistModel } from 'src/UserModel/BlacklistedModel';
const blacklistedTokens = new Set();
// PassportStrategy: A way to plug in a strategy (like JWT) into NestJS.
// ExtractJwt & Strategy: Tools from passport-jwt to help read and validate JWT tokens.
@Injectable()
export class AuthService extends PassportStrategy(Strategy) {
//    @InjectModel(BlacklistModel) private readonly blacklistModel: typeof BlacklistModel
    constructor(
        @InjectModel(BlacklistModel)
        private readonly blacklistModel: typeof BlacklistModel,
    ){
//         jwtFromRequest: This tells Passport where to find the JWT token.
// In this case, it looks in the Authorization header as:
// This is the secret used to verify the token.
// You should ideally store this in .env, but here it’s hardcoded as "NEST".
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:"NEST"
        })
       
    }

    async validate(payload: any) {
        // Attach this to `req.user`
        return { userId: payload.id, email: payload.email, name:payload.name };
      }


      async blacklistToken(token:any) {
        // this is to blacklist token when user want to logout 
        // blacklistedTokens.add(token);
       await  this.blacklistModel.create({
            token:token,
            is_blackedlisted:true
        })
      }

      async isTokenBlacklisted(token:any) {
    let blacklist =     await this.blacklistModel.findOne({
            where:{token:token},
            raw:true
        })
        if(blacklist){
            return true;
        }
        // return blacklistedTokens.has(token);
      }
}
