import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, NavParams } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/models/products.model';
import { GetProductsByCategory } from 'state/products/products.actions';
import { ProductsState } from 'state/products/products.state';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.page.html',
  styleUrls: ['./list-products.page.scss'],
})
export class ListProductsPage{
  @Select(ProductsState.products) private products$: Observable<Product[]>;

  private idCategory: string = '';
  public products: Product[] = [];
  private subscription:Subscription;

  constructor(
    private navController: NavController,
    private navParams: NavParams,
    private store: Store,
    private loadingController: LoadingController,
    private translate: TranslateService
  ) {
    this.products=[];
  }

  async ionViewWillEnter(){

    this.subscription=new Subscription();
    this.idCategory = this.navParams.data['idCategory'];

    if (this.idCategory) {
      const loading = await this.loadingController.create({
        message: 'Cargando...',
        duration: 500,
      });
      loading.present();

      this.store.dispatch(
        new GetProductsByCategory({ idCategory: this.idCategory })
      );

      const sub=this.products$.subscribe({
        next: () => {
          this.products = this.store.selectSnapshot(ProductsState.products);
        },
        error: (err) => {
          console.error(err)
        },
        complete:()=>{
          loading.dismiss();
        }
      });
      this.subscription.add(sub);
    } else {
      this.navController.navigateForward('categories');
    }

  }
  ionViewWillLeave(){

    console.log("Eliminado subscripciones")
  this.subscription.unsubscribe();
  }


  goToProduct(product: Product) {
    this.navParams.data['product'] = product;
    this.navController.navigateForward('product');
  }

  refreshProducts($event) {
    this.store.dispatch(
      new GetProductsByCategory({ idCategory: this.idCategory })
    );

    $event.target.complete();
  }
}
