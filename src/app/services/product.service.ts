import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { GetProductsByCategory } from './../../../state/products/products.actions';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/products.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  getProductsByCategory(idCategory: string) {
    return CapacitorHttp.get({
      url: environment.uriApi+ 'products/category/' + idCategory,
      params: {},
      headers: {
        'Content-type': 'application/json',
      },
    }).then((response: HttpResponse) => {
      if (response.status == 200) {
        return response.data as Product[];
      }
      return [];
    });
  }
  getProductById(id:string){

    return CapacitorHttp.get({
      url:environment.uriApi+ "products/" + id,
      params:{},
      headers:{
        'Content-Type':'application/json'
      }
    }).then((response:HttpResponse)=>{
      if(response.status===200){

        const data=response.data as Product;
        return data
      }
      return null;
    })
  }
}
