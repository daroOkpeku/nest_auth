import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BlogModel } from 'src/UserModel/BlogModel';

@Module({
  imports:[SequelizeModule.forFeature([BlogModel])],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
