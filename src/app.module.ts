import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './models/user/user.module';
import { BookingController } from './models/booking/booking.controller';
import { BookingModule } from './models/booking/booking.module';

@Module({
  imports: [UserModule, BookingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
