import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthService } from './auth/auth.service';
import { BlacklistModule } from './blacklist/blacklist.module';
import { BlogModule } from './blog/blog.module';
import { ScheduleModule } from '@nestjs/schedule'; // import the ScheduleModule for the cronjob
// import { TaskModule } from './task/task.module';
import { TaskModule } from './task/task.module';

@Module({
  // UsersModule
  imports: [UsersModule, DatabaseModule, BlacklistModule, BlogModule, ScheduleModule.forRoot(), TaskModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
