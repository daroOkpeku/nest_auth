import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BlacklistModel } from 'src/UserModel/BlacklistedModel';
@Module({
    // this is because i am using BlacklistModel in different part of the part of the appllication
    // i am using BlacklistModel in usercontroller that why i had to register it in User modules
    // and i also the AppModule to make availiable
    imports:[SequelizeModule.forFeature([BlacklistModel])],
    exports:[SequelizeModule]
})
export class BlacklistModule {}
