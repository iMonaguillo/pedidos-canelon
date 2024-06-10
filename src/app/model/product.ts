export class Product {
  id!: number;
  customer: string;
  name: string;
  price: number;
  quantity: number;
  status: string;

  constructor(customer: string, name: string, price: number, quantity: number, status: string) {
    this.customer = customer;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.status = status;
  }
}
