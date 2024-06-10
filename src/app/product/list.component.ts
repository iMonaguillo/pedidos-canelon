import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {ToastrService} from "ngx-toastr";
import {Product} from "../model/product";
import Swal from "sweetalert2";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private toast: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.list().subscribe(
      data => {
        this.products = data;
      },
      err => {
        this.toast.error(err.error.message, 'Error', {timeOut: 3000, positionClass: 'toast-top-center'})
      }
    );
  }

  onDelete(id: number): void {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'No podrás deshacer esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si estoy seguro',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.productService.delete(id).subscribe(
          data => {
            this.toast.success(data.message, 'OK', { timeOut: 3000, positionClass: 'toast-top-right'});
            this.getProducts();
          },
          err => {
            this.toast.error(err.error.message, 'Error', { timeOut: 3000, positionClass: 'toast-top-right'})
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'producto no eliminado',
          'error'
        )
      }
    });
  }

  onStatus(id: number): void {
    const product = this.products.find(prod => prod.id === id);
    if (product){
      product.status = product.status === 'Pendiente' ? 'Entregado' : (product.status == 'Entregado' ? 'Cancelado' : 'Pendiente');
      this.productService.update(product.id, product).subscribe(
        () => {
          this.toast.success('Estado actualizado correctamente', 'OK', {timeOut: 3000, positionClass: 'toast-top-right'});
        },
        err => {
          this.toast.error(err.error.message, 'Error', { timeOut: 3000, positionClass: 'toast-top-right' });
        }
      );
    }
  }
}
