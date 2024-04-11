import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { CreatePaymentSheet } from './stripe.actions';
import { StripeService } from 'src/app/services/stripe.service';
import { Payment } from 'src/app/models/payment.models';

export class StripeStateModel {
payment:Payment
}

const defaults = {
  payment: null
};

@State<StripeStateModel>({
  name: 'stripe',
  defaults
})
@Injectable()
export class StripeState {

@Selector()
static payment(state:StripeStateModel){
  return state.payment;
}

constructor(private stripeService:StripeService){}

  @Action(CreatePaymentSheet)
  add({ getState, setState }: StateContext<StripeStateModel>, { payload }: CreatePaymentSheet) {
      return this.stripeService.createPaymentSheet(payload.paymentIntent).then( (payment:Payment)=>{
        setState({
          payment
        })
      })

  }
}
