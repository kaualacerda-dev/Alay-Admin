import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'Header',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './header.html',
})
export class HeaderComponent {}
