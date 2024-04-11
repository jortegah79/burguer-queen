import { Component } from '@angular/core';
import { Stripe } from '@capacitor-community/stripe';
import { NavController } from '@ionic/angular';
import { Select, Selector, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { CreatePaymentIntent } from 'src/app/models/create-payment-intent';
import { Payment } from 'src/app/models/payment.models';
import { User } from 'src/app/models/user.models';
import { UserOrderService } from 'src/app/services/user-order.service';
import { environment } from 'src/environments/environment';
import { CreatePaymentSheet } from 'state/stripe/stripe.actions';
import { StripeState } from 'state/stripe/stripe.state';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage {

@Select(StripeState.payment)
private payment$:Observable<Payment>;


  public user: User;
  public showNewAccount: boolean = false;
  public showBack: boolean = false;
  public step: number = 1;
  public optionAddress: string='address-default';
  public showNewAddress: boolean = false;
  public address: string = '';
  private subscription:Subscription;

  constructor(
    public  userOrderService: UserOrderService,
    private navController: NavController,
    private store:Store
  ) {  }

  newAccount() {
    this.showNewAccount = true;
  }

  showLogin() {
    this.showNewAccount = false;
  }

  ionViewWillEnter() {
    this.user = this.userOrderService.hasUser();
    this.step = 1;
    Stripe.initialize({
      publishableKey:environment.publishKey
    })
    this.detectChangesPayment();
this.subscription=new Subscription;

  }

  nextStep() {
    this.step++;
  }
  previousStep() {
    this.step--;
  }
  backHome() {
    this.navController.navigateForward('categories');
  }
  changeOptionAddress() {

    switch (this.optionAddress) {
      case 'address-default':
        this.showNewAddress = false;
        this.address=this.user.address;
        break;
      case 'choose-default':
        this.showNewAddress = true;
        this.address='';
        break;
    }
  }

  payWithStripe(){

    const total=this.userOrderService.totalOrder()*100;

    const paymentIntent:CreatePaymentIntent={
      secretKey:environment.secretKey,
      amount: +total.toFixed(0),
      currency:'EUR',
      customer_id:'cus_PKkAya1TLyy2VO'
    }
    this.store.dispatch( new CreatePaymentSheet({
      paymentIntent
    }))
  }

  detectChangesPayment(){
const subs=this.payment$.subscribe({
  next:()=>{
    const payment=this.store.selectSnapshot(StripeState.payment)
    if(payment){
      Stripe.createPaymentSheet(payment);
      Stripe.presentPaymentSheet().then( (result)=>{
        console.log(result)
      });
    }
  }
})
this.subscription.add(subs);
  }
}
