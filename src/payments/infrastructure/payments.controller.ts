import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentSession } from '../dto/payment-session.dto';
import {Response} from 'express';  

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-payment-session')
  createPaymentSession(@Body() paymentSession: PaymentSession) {

    return this.paymentsService.create(paymentSession);
  }

  @Post('webhook')
  async stripeWebhook(@Req() req: Request, @Res() res: Response) {
    return this.paymentsService.stripeWebhook(req, res);
  }

  @Get('success')
  succes() {

    return {
      ok : true,
      messavge : 'Payment Successfull'
    }
  
  }

  @Get('cancel')
  cancel() {

    return {
      ok : true,
      messavge : 'Payment Cancelled'
    }
  
  }
}
