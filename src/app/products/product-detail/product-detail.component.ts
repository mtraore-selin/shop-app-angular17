import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { ProductsService } from '../products.service';
import { Product } from '../product';
import { CartService } from '../../cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product: Product | undefined;
  private productSubscription: Subscription | undefined;
  route = inject(ActivatedRoute);
  productService = inject(ProductsService);
  private cartService = inject(CartService);

  ngOnInit(): void {
    console.log('Detail product');
    this.route.params.subscribe((params) => {
      const productId = params['id'];
      this.productService.getProductById(productId).subscribe((product) => {
        this.product = product;
      });
    });
  }

  addToCart(id: string) {
    this.productSubscription = this.productService.getProductById(id).subscribe(
      (product) => {
        if (product) {
          // Add the retrieved product to the cart
          this.cartService.addProduct(product);
        } else {
          console.error('Product not found.');
        }
      },
      (error) => {
        console.error('Error retrieving product:', error);
      }
    );
  }

  ngOnDestroy() {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }
}
