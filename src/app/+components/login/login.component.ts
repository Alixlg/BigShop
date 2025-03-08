import { Component, inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MenuVisibleService } from '../../+services/menu-visible.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements  OnDestroy {
  menuVisible = inject(MenuVisibleService);
  router = inject(Router);

  isDarkMode: boolean = true;
  isLogin: boolean = false;

  username: string = "";
  password: string = "";
  error: string = "";

  ngOnDestroy(): void {
    this.menuVisible.isShow = !this.menuVisible.isShow;
  }

  constructor() {
    this.menuVisible.isShow = !this.menuVisible.isShow;
  }

  login() {
    if (this.username.length >= 2 && this.password.length >= 8) {
      if (this.username == "admin" && this.password == "12345678") {
        this.isLogin = true;
        this.error = "شما با موفقیت وارد شدید";
        this.router.navigate(['admin']);
      }
      else {
        this.error = "رمز عبور یا نام کاربری اشتباه است";
      }
    }
    else {
      this.error = "لطفا مقادیر خواسته شده را به درستی وارد کنید";
    }
  }
}
