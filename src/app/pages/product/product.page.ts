import { NavController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/products.model';
import { ProductExtraOption } from 'src/app/models/productsExtraOption.model';
import { Store } from '@ngxs/store';
import { GetProductsById } from 'state/products/products.actions';
import { ProductsState } from 'state/products/products.state';
import { UserOrderService } from 'src/app/services/user-order.service';
import { ToastService } from 'src/app/services/toast.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage {
  product: Product;
  totalPrice: number;

  constructor(
    private navController: NavController,
    private navParams: NavParams,
    private store: Store,
    private userOrderService: UserOrderService,
    private toastService:ToastService,
    private translate:TranslateService
  ) {
    this.product = null;
  }

  ionViewWillEnter() {
    this.product = this.navParams.data['product'];
    if (this.product && this.product.extras) {
      this.totalPrice = this.product.price;
    }
    if (!this.product) {
      this.navController.navigateForward('categories');
    }
  }

  changeMultipleOption($event, options: ProductExtraOption[]) {
    options.forEach((op) => (op.activate = $event.detail.value == op.name));
    this.calculateTotal();
  }

  calculateTotal() {
      this.totalPrice =this.userOrderService.priceProduct(this.product)
  }

  getProduct($event) {
    this.store
      .dispatch(new GetProductsById({ id: this.product._id }))
      .subscribe({
        next: () => {
          this.product = this.store.selectSnapshot(ProductsState.product);
          this.calculateTotal();
        },
        complete: () => {
          $event.target.complete();
        },
      });
  }

  addProductOrder() {
    this.userOrderService.addProduct(this.product);
    this.toastService.showToast(
      this.translate.instant('label.product.add.success')
    )
    this.navController.navigateForward('/');
  }
}
