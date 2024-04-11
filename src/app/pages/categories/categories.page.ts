import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, NavParams } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.models';
import { GetCategories } from 'state/categories/categories.actions';
import { CategoriesState } from 'state/categories/categories.state';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage {

  @Select(CategoriesState.categories) private categories$:Observable<Category[]>;
  public categories: Category[] = [];
  private subscription:Subscription;

  constructor(
    private store: Store,
    private loadingControlller: LoadingController,
    private translate: TranslateService,
    private navController:NavController,
    private navParams:NavParams
  ) {}

  ionViewWillEnter(){
    this.subscription=new Subscription();
    this.loadData();
  }


  async loadData() {
    const loading = await this.loadingControlller.create({
      message: 'Cargando...',
      duration: 500,
    });

    loading.present();

    const sub=this.store.dispatch(new GetCategories());

    this.categories$.subscribe({
      next: () => {
        this.categories = this.store.selectSnapshot(CategoriesState.categories);
        loading.dismiss();
      },
      error: (err) => {
        console.error(err);
      },
      complete:()=>{
        loading.dismiss();
      }
    });
  }

  goToProducts(category:Category):void{

    this.navParams.data['idCategory']=category._id;
    this.navController.navigateForward('list-products')
  }

  refreshCategories($event){
    this.store.dispatch(new GetCategories());

    $event.target.complete();
  }

  ionViewWillLeave(){
    this.subscription.unsubscribe();
  }
}
