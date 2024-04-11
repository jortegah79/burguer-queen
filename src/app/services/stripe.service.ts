import { Injectable } from '@angular/core';
import { Capacitor, CapacitorHttp, HttpResponse } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { CreatePaymentIntent } from '../models/create-payment-intent';
import { Payment } from '../models/payment.models';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

createPaymentSheet(paymentIntent:CreatePaymentIntent){
  return CapacitorHttp.post({
    url:environment.uriApi+'stripe/intent',
    params:{},
    headers:{
      'Content-Type':'application/json',
      'Authorization':`Bearer ${paymentIntent.secretKey}`
    },data:{
      ...paymentIntent
    }
  }).then( (response:HttpResponse)=>{
    if(response.status==201){
      const data=response.data as Payment
      return data;
    }
    return null;
  }).catch(err=>{
    console.error(err)
  })
}


}
