import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ProductComponent } from "./product/product.component";
import { ProductService } from '../../+services/product.service';
import { BasketService } from '../../+services/basket.service';
import { Product } from '../../+models/product';

@Component({
  selector: 'app-products',
  imports: [ProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  productsObj = inject(ProductService);
  basketProductsObj = inject(BasketService);

  buy($event: Product) {
    if (this.basketProductsObj.basket.every(p => p.id != $event.id)) {
      this.basketProductsObj.basket.push($event);
    }
    else {
      let product = this.basketProductsObj.basket.find(p => p.id == $event.id);
      this.basketProductsObj.basket = this.basketProductsObj.basket.filter(p => p.id != $event.id);
      if (product) { // agar undefine nabood
        product.count += 1;
        this.basketProductsObj.basket.push(product);
      }
    }
  }
}
