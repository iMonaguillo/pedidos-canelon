import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Product} from "../model/product";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {

  customer!: string;
  name!: string;
  price!: number;
  quantity!: number;
  status: string = 'Pendiente';

  constructor(
    private productService: ProductService,
    private toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  onCreate(): void {
    const product = new Product(this.customer, this.name, this.price, this.quantity, this.status)
    this.productService.create(product).subscribe(
      data => {
        this.toast.success(data.message, 'OK', { timeOut: 3000, positionClass: 'toast-top-center'});
        this.router.navigate(['']);
      },
      err => {
        this.toast.error(err.error.message, 'Error', { timeOut: 3000, positionClass: 'toast-top-center'})
      }
    );
  }
}
