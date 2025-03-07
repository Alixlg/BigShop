import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../+services/product.service';
import { count } from 'rxjs';
import { Product } from '../../+models/product';
import { BasketService } from '../../+services/basket.service';

@Component({
  selector: 'app-admin-panel',
  imports: [FormsModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {
  productsObj = inject(ProductService);
  basketObj = inject(BasketService);

  addProductVisible: boolean = false;
  delProductVisible: boolean = false;
  alert: string = '';

  productBrand: string = '';
  productTitle: string = '';
  productPrice: string = '';
  productPic: string = '';

  addProduct() {
    if (!this.productBrand || !this.productTitle || !this.productPrice || !this.productPic) {
      this.alert = 'لطفاً تمام فیلدها را پر کنید';
      return;
    }
    if (isNaN(Number(this.productPrice))) {
      this.alert = 'لطفاً برای قیمت عدد وارد کنید';
      this.productPrice = '';
      return;
    }

    this.productsObj.products.push(
      new Product(this.productBrand, this.productTitle, this.productPrice, this.productPic)
    );
    this.addProductVisible = !this.addProductVisible;

    this.productBrand = '';
    this.productTitle = '';
    this.productPrice = '';
    this.productPic = '';
    this.alert = 'محصول شما با موفقیت ثبت شد';
  }

  delProduct(product: Product) {
    this.productsObj.products = this.productsObj.products.filter(p => p.id != product.id);
    this.basketObj.basket = this.basketObj.basket.filter(p => p.id != product.id);
    this.alert = 'محصول شما با موفقیت حذف شد';
  }
}
