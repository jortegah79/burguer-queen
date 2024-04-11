import { Injectable } from '@angular/core';
import { Order } from '../models/order.models';
import { Preferences } from '@capacitor/preferences';
import { KEY_ORDER } from '../constants/constants';
import { Product } from '../models/products.model';
import { QuantityProduct } from '../models/quantity.product.models';
import { isEqual, remove } from 'lodash-es';
import { User } from '../models/user.models';

@Injectable({
  providedIn: 'root',
})
export class UserOrderService {
  private order: Order;

  constructor() {
    this.initOrder();
  }

  async initOrder() {
    const order = await Preferences.get({ key: KEY_ORDER });
    if (!order.value) {
      await this.clear();
    } else {
      this.order = JSON.parse(order.value);
    }
  }

  async saveOrder() {
    await Preferences.set({
      key: KEY_ORDER,
      value: JSON.stringify(this.order),
    });
  }

  async resetOrder() {
    this.order.products = [];
    await this.saveOrder();
  }
  async clear() {
    this.order = new Order();
    this.order.products = [];
    await this.saveOrder();
  }

  async addProduct(product: Product) {
    const productFound = this.searchProduct(product);
    if (productFound) {
      productFound.quantity++;
    } else {
      this.order.products.push({
        product,
        quantity: 1,
      });
    }
    await this.saveOrder();
  }
  private searchProduct(product: Product) {
    return this.order.products.find((p: QuantityProduct) =>
      isEqual(product, p.product)
    );
  }

  getProducts() {
    return this.order.products;
  }

  hasUser() {
    return this.order && this.order.user;
  }

  numProducts() {
    if (this.order && this.order.products.length > 0) {
      return this.order.products.reduce(
        (acum: number, value: QuantityProduct) => value.quantity + acum,
        0
      );
    }
    return 0;
  }

  async saveUser(user: User) {
    delete user.password;
    this.order.user = user;
    await this.saveOrder();
  }

  async oneMoreProduct(product: QuantityProduct) {
    const productsFound = this.searchProduct(product.product);

    if (productsFound) {
      productsFound.quantity++;
    }

    await this.saveOrder();
  }

  async oneLessProduct(product: QuantityProduct) {
    const productsFound = this.searchProduct(product.product);

    if (productsFound) {
      productsFound.quantity--;
      if (productsFound.quantity === 0) {
        this.removeProduct(product);
      }
    }

    await this.saveOrder();
  }

  async removeProduct(product: QuantityProduct) {
    remove(this.order.products, (p) => isEqual(p.product, product.product));
    await this.saveOrder();
  }
  priceProduct(product: Product) {
    let total = product.price;
    if (product.extras) {
      product.extras.forEach((extra) => {
        if (extra.blocks) {
          extra.blocks.forEach((block) => {
            if (block.options.length === 1 && block.options[0].activate) {
              total += block.options[0].price;
            } else if (block.options.length > 1) {
              const option = block.options.find((op) => op.activate);
              total += option.price;
            }
          });
        }
      });
    }

    return parseFloat(total.toFixed(2));
  }

  totalPrice(quantityProduct: QuantityProduct) {
    const precioUnidad = this.priceProduct(quantityProduct.product);
    const total = precioUnidad * quantityProduct.quantity;
    return parseFloat(total.toFixed(2));
  }

  totalOrder(){
    let total=0;
    for( const quantityProduct of this.order.products){
      total+=this.totalPrice(quantityProduct);
    }
    return parseFloat(total.toFixed(2));;
  }
}
