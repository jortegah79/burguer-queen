import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { Product } from 'src/app/models/products.model';
import { QuantityProduct } from 'src/app/models/quantity.product.models';
import { UserOrderService } from 'src/app/services/user-order.service';
import { ExtrasSelectedPipe } from '../extras-selected/extras-selected.pipe';

@Component({
  standalone:true,
  imports:[IonicModule,FormsModule,TranslateModule,CommonModule,ExtrasSelectedPipe],
  selector: 'app-list-products-order',
  templateUrl: './list-products-order.component.html',
  styleUrls: ['./list-products-order.component.scss'],
})
export class ListProductsOrderComponent {

  products:QuantityProduct[];

  constructor(
    public userOrderService:UserOrderService) {
      this.products=this.userOrderService.getProducts();
    }



}
