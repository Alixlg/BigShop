import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../+models/product';

@Component({
  selector: 'app-product',
  imports: [DecimalPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() product!: Product;
  @Output() onBuy = new EventEmitter<Product>;
  @Output() onRemove = new EventEmitter<Product>;
  @Input() isBasket: boolean = false;
}
