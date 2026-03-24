import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService, Product } from '../../core/services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Observable,
  BehaviorSubject,
  switchMap,
  catchError,
  of,
  tap,
  map,
  distinctUntilChanged,
} from 'rxjs';

@Component({
  selector: 'app-stock-view',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './stock-view.html',
})
export class StockViewComponent implements OnInit {
  totalProducts = 0;

  searchName = '';

  private searchSubject = new BehaviorSubject<string>('');

  products$!: Observable<Product[]>;

  loading = false;
  error: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.products$ = this.searchSubject.pipe(
      map((term) => term.trim()),
      distinctUntilChanged(),
      tap(() => {
        this.loading = true;
        this.error = null;
      }),
      switchMap((term) =>
        (term ? this.productService.searchProduct(term) : this.productService.getProducts()).pipe(
          tap((res) => {
            this.totalProducts = res.meta.total;
          }),
          map((res) => res.data),
          catchError(() => {
            this.error = 'Nao foi possivel carregar os produtos.';
            return of([]);
          }),
          tap(() => {
            this.loading = false;
          }),
        ),
      ),
    );
  }

  searchProduct() {
    this.searchSubject.next(this.searchName);

    this.searchName = '';
  }
}
