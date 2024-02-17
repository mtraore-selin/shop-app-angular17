import { computed, effect, Injectable, signal } from '@angular/core';

import { Product } from '../products/product';
import { CartItem } from './cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = signal<CartItem[]>([]);

  cartCount = computed(() =>
    this.cartItems().reduce((acc, curr) => acc + curr.quantity, 0)
  );

  cartSubTotal = computed(() =>
    this.cartItems().reduce(
      (acc, curr) => acc + curr.quantity * curr.product.price,
      0
    )
  );

  // calculate tax of 8% on top of the subtotal
  cartTax = computed(() => this.cartSubTotal() * 0.08);

  cartTotal = computed(() => this.cartSubTotal() + this.cartTax());

  e = effect(() => console.log('cartCount updated', this.cartCount()));
  i = effect(() => console.log('cartItems updated', this.cartItems()));

  addProduct(product: Product): void {
    const indexFound = this.cartItems().findIndex(
      (p) => p.product.id === product.id
    );

    if (indexFound >= 0) {
      const updatedItems = this.cartItems().map((item, index) => {
        if (index === indexFound) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
      this.cartItems.update(() => updatedItems);
    } else {
      const newItem = { product, quantity: 1 };
      this.cartItems.update((items) => [...items, newItem]);
    }
  }

  updateCartQuantity(cartItem: CartItem): void {
    const updatedItems = this.cartItems().map((item) => {
      if (item.product.id === cartItem.product.id) {
        return cartItem;
      } else {
        return item;
      }
    });
    this.cartItems.update(() => updatedItems);
  }

  removeProduct(product: Product): void {
    this.cartItems.update((items) =>
      items.filter((p) => p.product.id !== product.id)
    );
  }
}
