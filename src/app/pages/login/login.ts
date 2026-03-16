import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service'


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,],
  templateUrl: './login.html',
})

export class LoginComponent {

  email = '';
  password = '';

  constructor( private authService: AuthService) {}

  login () { 

    this.authService.login(this.email, this.password)
      .subscribe((Response: any ) => {
        this.authService.saveToken(Response.access_token);
      })

    
  }

}
