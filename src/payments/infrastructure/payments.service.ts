import { Injectable } from '@nestjs/common';
import { PaymentSession } from '../dto/payment-session.dto';
import Stripe from 'stripe';
import { envs } from 'src/common/config/envs';
import {Response} from 'express';  

@Injectable()
export class PaymentsService {

  private readonly stripe = new Stripe(envs.STRIPE_SECRET);

  async create(paymentSession: PaymentSession) {

    const { orderId,currency , items } = paymentSession;

    const lineItems = items.map( item => (
      {
        price_data : {
          currency,
          product_data: {
            name: item.name
          },
          //20 dolares - 2000 / 100 = 20.00
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity
      }
    ))

    const session = await this.stripe.checkout.sessions.create({
      //colocar aqui el Id de mi Orden
      payment_intent_data: {
        metadata: {
          order_id: orderId
        }
      },
      line_items: lineItems,
      mode: 'payment', 
      success_url : envs.STRIPE_SUCCESS_URL,
      cancel_url  : envs.STRIPE_CANCER_URL 
    })

    return session;
  }

  async stripeWebhook(req: Request, response: Response) {

    const sig = req.headers['stripe-signature'];

    let event : Stripe.Event;

    const endPointSecret = envs.STRIPE_ENDPOINT_SECRET;

    try{
      event = this.stripe.webhooks.constructEvent(req['rawBody'], sig, endPointSecret);
    }
    catch(err) {
      response.status(400).send(`Webhook Error ${ err.message }`);
      return;
    }  
    
    const chargeSucceeded = event.data.object;
    // TODO: llamar nuestro microservicio
    console.log('aaaaa');

  }
}
