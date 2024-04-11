
export class ProductExtraOption {
  name?: string;
  price: number;
  activate: boolean;

  constructor(price, activate, name = '') {
    this.name = name;
    this.price = price;
    this.activate = activate;
  }
}
