import { ProductExtraOption } from "./productsExtraOption.model";

export class ProductExtraBlock {
  name: string;
  img: string;
  options: ProductExtraOption[];

  constructor(name) {
    this.name = name;
    this.img = '';
    this.options = [];
  }
}

