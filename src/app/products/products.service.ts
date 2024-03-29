import { Injectable, inject } from '@angular/core';
import { Product } from './product';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products: Product[] = [];

  private readonly API = `/products`;
  private readonly isLocal = true;
  private http = inject(HttpClient);

  load(): Observable<Product[]> {
    if (this.isLocal) {
      for (let num = 1; num <= 10; num++) {
        this.addProducts(num);
      }
      return of(this.products);
    }
    return this.http.get<Product[]>(this.API);
  }

  getProductById(productId: string): Observable<Product | undefined> {
    if (this.isLocal) {
      const product = this.buildProduct(Number(productId));
      return of(product);
    }
    return this.http.get<Product>(`${this.API}/${productId}`);
  }

  create(product: Product): Observable<Product> {
    if (this.isLocal) {
      this.products.push(product);
      return of(product);
    }
    return this.http.post<Product>(this.API, product);
  }

  private addProducts(i: number): void {
    const prod = this.buildProduct(i);
    this.products.push(prod);
  }

  update(product: Product): Observable<Product> {
    if (this.isLocal) {
      const index = this.products.findIndex((p) => p.id === product.id);
      if (index !== -1) {
        this.products[index] = product;
        return of(product);
      } else {
        throw new Error('Product not found in local storage.');
      }
    } else {
      const url = `${this.API}/${product.id}`;
      return this.http.put<Product>(url, product);
    }
  }

  private buildProduct(i: number): Product {
    return {
      id: `${i}`,
      price: parseFloat((Math.random() * (0.0 - 10.0) + 10.0).toFixed(2)),
      status: ['sale', 'new', 'feat', 'oos'][Math.floor(Math.random() * 4)],
      discounted: ['', '', '', 'discounted'][Math.floor(Math.random() * 4)],
      discount: parseFloat((Math.random() * (0.0 - 10.0) + 10.0).toFixed(2)),
      name: ['Coffee'][Math.floor(Math.random() * 1)],
      description: ['B & W', 'Grey', 'Black', 'Green', 'Black'][
        Math.floor(Math.random() * 5)
      ],
      image: `${i}`,
    };
  }
}
