import { QuantityProduct } from './quantity.product.models';
import { User } from './user.models';

export class Order {
  _id?: string;
  user: User;
  products: QuantityProduct[];
  address?: string;

}
