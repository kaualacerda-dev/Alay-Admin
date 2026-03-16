import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class ProductService {

  constructor(private http: HttpClient) {}

  createProducts() {
    return this.http.post(`${environment.apiUrl}/product/create`, {

        name: String,
        sku: String,
        price: Number,
        stock: Number,
        description: String,


    });
  }

  getProducts() {
    return this.http.get(`${environment.apiUrl}/product/:id`);
  }

}