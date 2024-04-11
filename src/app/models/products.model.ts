import { Category } from "./category.models";
import { ProductExtra } from "./productExtra.model";

export class Product {
  _id: string;
  name: string;
  price: number;
  category: Category;
  img?: string;
  extras?: ProductExtra[];

  contructor(id, name, price, category, img = '') {
    this._id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.img = '';
    this.extras = [];
  }
}

