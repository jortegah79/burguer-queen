import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Category } from 'src/app/models/category.models';
import { GetCategories } from './categories.actions';
import { CategoriesService } from 'src/app/services/categories.service';

export class CategoriesStateModel {
  categories: Category[];
}

const defaults = {
  categories: [],
};

@State<CategoriesStateModel>({
  name: 'categories',
  defaults,
})
@Injectable()
export class CategoriesState {

   @Selector()
   static categories(state:CategoriesStateModel){
      return state.categories;
   }

  constructor(private categoriesServ: CategoriesService) {}

  @Action(GetCategories) add({ setState }: StateContext<CategoriesStateModel>) {
    return this.categoriesServ
      .getCategories()
      .then((categories: Category[]) => {
        setState({ categories });
      });
  }
}
