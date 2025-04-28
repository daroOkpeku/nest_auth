import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BlacklistModel } from 'src/UserModel/BlacklistedModel';
@Injectable()
export class TaskService {
    private readonly logger = new Logger(TaskService.name);
  
    
    
    @Cron(CronExpression.EVERY_10_MINUTES)
   async handCron(){
        this.logger.debug('Running the cron job every 10 seconds');
        const presentDay  = new Date();
        const balcklist = await BlacklistModel.findAll()
     
        balcklist.forEach(async black => {
             let createdate = new Date(black.createdAt)
             createdate.setDate(createdate.getDate() + 30);

             if (createdate <= presentDay) {
                this.logger.log(`Blacklist entry expired: ${black.id}`);
                 const deleteOne =   await BlacklistModel.findOne({where:{id:black.id}})
                   await deleteOne?.destroy()
              }

        });

    }
}
