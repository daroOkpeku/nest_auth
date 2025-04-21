import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthService } from './auth/auth.service';
import { BlacklistModule } from './blacklist/blacklist.module';


@Module({
  // UsersModule
  imports: [UsersModule, DatabaseModule, BlacklistModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
