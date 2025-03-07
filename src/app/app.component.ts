import { Component, inject, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BasketService } from './+services/basket.service';
import { MenuVisibleService } from './+services/menu-visible.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'BigShop';
  menuVisible = inject(MenuVisibleService);
  basketObj = inject(BasketService);

  basketCount() {
    let count = 0;
    this.basketObj.basket.forEach(x => {
      count += x.count;
    });

    return count;
  }
}
