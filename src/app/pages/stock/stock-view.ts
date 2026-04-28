import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService, Product } from '../../core/services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-stock-view',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './stock-view.html',
})
export class StockViewComponent implements OnInit {
  totalProducts = 0;

  searchName = '';
  products: Product[] = [];

  loading = false;
  error: string | null = null;

  constructor(
    private productService: ProductService,
    private changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  searchProduct() {
    this.loadProducts(this.searchName);
    this.searchName = '';
  }

  loadProducts(searchTerm = '') {
    const term = searchTerm.trim();
    const request = term
      ? this.productService.searchProduct(term)
      : this.productService.getProducts();

    this.loading = true;
    this.error = null;

    request
      .pipe(
        finalize(() => {
          this.loading = false;
          this.changeDetector.detectChanges();
        }),
      )
      .subscribe({
        next: (response) => {
          const normalizedResponse = this.normalizeProductResponse(response);

          this.products = normalizedResponse.products;
          this.totalProducts = normalizedResponse.total;
          this.changeDetector.detectChanges();
        },
        error: () => {
          this.products = [];
          this.totalProducts = 0;
          this.error = 'Não foi possível carregar os produtos.';
          this.changeDetector.detectChanges();
        },
      });
  }

  private normalizeProductResponse(response: unknown) {
    if (Array.isArray(response)) {
      return {
        products: response as Product[],
        total: response.length,
      };
    }

    if (
      response &&
      typeof response === 'object' &&
      'data' in response &&
      Array.isArray(response.data)
    ) {
      const products = response.data as Product[];
      const total =
        'meta' in response &&
        response.meta &&
        typeof response.meta === 'object' &&
        'total' in response.meta &&
        typeof response.meta.total === 'number'
          ? response.meta.total
          : products.length;

      return {
        products,
        total,
      };
    }

    return {
      products: [],
      total: 0,
    };
  }
}
