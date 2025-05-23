import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BlogModel } from 'src/UserModel/BlogModel';
// import { BlacklistModel } from 'src/UserModel/BlacklistedModel';
import { UserModel } from 'src/UserModel/UserModel';

@Module({
    imports:[
        SequelizeModule.forRoot({
            dialect:'mysql',
            host:'localhost',
            port:3306,
            username:"root",
            password:"",
            database:"nest_blog",
            models:[BlogModel, UserModel],
            autoLoadModels:true,
            synchronize:true
        })
    ]
})
export class DatabaseModule {}
