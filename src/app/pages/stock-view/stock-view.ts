import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-stock-view',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './stock-view.html',
})
export class StockViewComponent {}
