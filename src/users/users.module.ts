import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Sequelize } from 'sequelize-typescript';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/UserModel/UserModel';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { BlacklistModule } from 'src/blacklist/blacklist.module';
import { IsBlacklistedMiddleware } from 'src/is-blacklisted/is-blacklisted.middleware';
// BlacklistModule
@Module({
  imports:[PassportModule, SequelizeModule.forFeature([UserModel]), BlacklistModule],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
  exports:[UsersService, AuthService]
})
export class UsersModule implements   NestModule {
  configure(consumer: MiddlewareConsumer) {
      // this adding the middleware to the particular route 
    consumer.apply(IsBlacklistedMiddleware).forRoutes({ path: 'users/me', method: RequestMethod.GET })
  
  }
}
