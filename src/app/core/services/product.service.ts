import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  createProducts(product: CreateProductPayload) {
    return this.http.post(`${environment.apiUrl}/product/create`, product);
  }

  getProducts() {
    return this.http.get<ProductResponse>(`${environment.apiUrl}/product`);
  }

  searchProduct(name: string) {
    return this.http.get<ProductResponse>(
      `${environment.apiUrl}/product?name=${encodeURIComponent(name)}`,
    );
  }
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  stock: number;
  price: number;
  description: string;
}

export interface CreateProductPayload {
  name: string;
  sku: string;
  stock: number;
  price: number;
  description: string;
  imageUrl: string;
}

export interface ProductResponse {
  data: Product[];
  meta: {
    total: number;
    page: number;
    limit: number;
    lastPage: number;
  };
}
