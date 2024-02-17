import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { ProductsService } from '../products.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink],
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;

  route = inject(ActivatedRoute);
  productService = inject(ProductsService);

  ngOnInit(): void {
    console.log('Detail product');
    this.route.params.subscribe((params) => {
      const productId = params['id'];
      this.productService.getProductById(productId).subscribe((product) => {
        this.product = product;
      });
    });
  }

  addToCart() {
    // Implement logic to add the product to the cart
  }
}
