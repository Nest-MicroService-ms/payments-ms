import { Module } from '@nestjs/common';
import { PaymentsService } from './infrastructure/payments.service';
import { PaymentsController } from './infrastructure/payments.controller';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
