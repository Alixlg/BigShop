import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../+services/product.service';
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
  searchProductVisible: boolean = false;
  editProductVisible: boolean = false;
  alert: string = '';

  productBrand: string = '';
  productTitle: string = '';
  productPrice: string = '';
  productPic: string = '';

  searchedProduct?: Product;
  searchId: string = '';

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

  searchProduct() {
    if (this.searchId == '') {
      this.alert = 'لطفا شناسه را وارد کنید';
      return;
    }
    if (isNaN(Number(this.searchId))) {
      this.alert = 'شناسه نامعتبر میباشد';
      this.searchId = '';
      return;
    }

    let product = this.productsObj.products.find(x => x.id == Number(this.searchId));

    if (product) {
      this.searchedProduct = product;
      this.searchProductVisible = false;
      this.editProductVisible = true;
      this.alert = 'محصول با موفقیت یافت شد';
    }
    else {
      this.alert = 'محصول مورد نظر یافت نشد لطفا شناسه صحیح وارد کنید';
      this.searchId = '';
      return;
    }
  }

  editProduct() {
    if (this.searchedProduct) {
      if (!this.productBrand || !this.productTitle || !this.productPrice || !this.productPic) {
        this.alert = 'لطفاً تمام فیلدها را پر کنید';
        return;
      }
      if (isNaN(Number(this.productPrice))) {
        this.alert = 'لطفاً برای قیمت عدد وارد کنید';
        this.productPrice = '';
        return;
      }

      this.searchedProduct.brand = this.productBrand;
      this.searchedProduct.price = this.productPrice;
      this.searchedProduct.title = this.productTitle;
      this.searchedProduct.pic = this.productPic;

      this.productsObj.products = this.productsObj.products.filter(x => x.id != this.searchedProduct?.id);
      this.basketObj.basket = this.basketObj.basket.filter(x => x.id != this.searchedProduct?.id);
      this.productsObj.products.push(this.searchedProduct);

      this.alert = 'محصول شما با موفقیت ویرایش شد';
    }
    else {
      this.alert = 'محصول مورد نظر یافت نشد لطفا شناسه را وارد کنید';
    }
    this.editProductVisible = false;
  }
}
