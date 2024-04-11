export class Category {
  
    _id: string;
  name: string;
  img: string;
  
  constructor(name:string, id = '', img = '') {
    
    this._id = id;
    this.name = name;
    this.img = img;
  }
}
