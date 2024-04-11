import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Product } from 'src/app/models/products.model';
import { ProductService } from 'src/app/services/product.service';
import { GetProductsByCategory, GetProductsById } from './products.actions';
import { CategoriesStateModel } from 'state/categories/categories.state';

export class ProductsStateModel {
  public products: Product[];
  public product: Product;
}

const defaults = {
  products: [],
  product: null,
};

@State<ProductsStateModel>({
  name: 'products',
  defaults,
})
@Injectable()
export class ProductsState {
  @Selector()
  static products(state: ProductsStateModel) {
    return state.products;
  }

  @Selector()
  static product(state: ProductsStateModel) {
    return state.product;
  }

  constructor(private productService: ProductService) {}

  @Action(GetProductsByCategory)
  getProductsByCategory(
    { getState, setState }: StateContext<ProductsStateModel>,
    { payload }: GetProductsByCategory
  ) {
    return this.productService
      .getProductsByCategory(payload.idCategory)
      .then((products: Product[]) => {
        const state = getState();
        setState({
          ...state,
          products,
        });
      });
  }

  @Action(GetProductsById)
  getProductsById(
    { getState, setState }: StateContext<ProductsStateModel>,
    { payload }: GetProductsById
  ) {
    return this.productService
      .getProductById(payload.id)
      .then((product: Product) => {
        const state = getState();
        setState({
          ...state,
          product,
        });
      });
  }
}
