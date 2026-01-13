import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { NotificationsGateway } from '../../notifications/notifications.gateway';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  providers: [AdminService, NotificationsGateway],
  controllers: [AdminController],
})
export class AdminModule {}