import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-product-registration',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './product-registration.html',
})
export class ProductRegistrationComponent {
  name = '';
  sku = '';
  stock: number | null = null;
  price: number | null = null;
  description = '';

  loading = false;
  message = '';
  messageType = '';

  constructor(private productService: ProductService) {}

  saveProduct() {
    this.message = '';
    this.messageType = '';

    const product = {
      name: this.name,
      sku: this.sku,
      stock: Number(this.stock),
      price: Number(this.price),
      description: this.description,
      imageUrl: '',
    };

    this.loading = true;

    this.productService
      .createProducts(product)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: () => {
          this.clearFields();
          this.message = 'Produto criado com sucesso.';
          this.messageType = 'success';
        },
        error: (error) => {
          this.message =
            error?.error?.message || 'Nao foi possivel criar o produto.';
          this.messageType = 'error';
        },
      });
  }

  clearFields() {
    this.name = '';
    this.sku = '';
    this.stock = null;
    this.price = null;
    this.description = '';
  }
}
