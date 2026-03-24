import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        console.log('RESPOSTA DA API:', response);
        
        
        this.authService.saveToken(response.accessToken);

        this.router.navigate(['/home']);
      },

      error: () => {
        this.errorMessage = 'Email ou senha inválidos';

        setTimeout(() => {
          this.errorMessage = '';
        }, 1000);
      },
    });
  }
}
