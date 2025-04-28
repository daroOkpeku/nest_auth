import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BlacklistModel } from 'src/UserModel/BlacklistedModel';

@Module({
  imports:[SequelizeModule.forFeature([BlacklistModel])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
