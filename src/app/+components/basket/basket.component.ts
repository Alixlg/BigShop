import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ProductComponent } from "../products/product/product.component";
import { BasketService } from '../../+services/basket.service';
import { Product } from '../../+models/product';

@Component({
  selector: 'app-basket',
  imports: [ProductComponent],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent {
  @Input() basketProductsObj = inject(BasketService);

  remove($event: Product) {
    if ($event.count == 1) {
      this.basketProductsObj.basket = this.basketProductsObj.basket.filter(p => p.id != $event.id);
    }
    else {
      let product = this.basketProductsObj.basket.find(p => p.id == $event.id);
      this.basketProductsObj.basket = this.basketProductsObj.basket.filter(p => p.id != $event.id);
      if (product) {
        product.count -= 1;
        this.basketProductsObj.basket.push(product);
      }
    }
  }
}
