import { CreatePaymentIntent } from "src/app/models/create-payment-intent";

export class CreatePaymentSheet {
  static readonly type = '[Stripe] CreatePaymentSheet';
  constructor(public payload: { paymentIntent:CreatePaymentIntent}) { }
}
