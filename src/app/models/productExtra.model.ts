import { ProductExtraBlock } from "./productsExtraBlock.model";

export class ProductExtra {
  label: string;
  blocks: ProductExtraBlock[];

  constructor(label) {
    this.label = label;
    this.blocks = [];
  }
}

