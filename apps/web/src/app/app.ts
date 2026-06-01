import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "@shared/ui/navbar/navbar";
import { Footer } from "@shared/ui/footer/footer";
import { NavbarPrivate } from '@shared/ui/navbar-private/navbar-private';
import { AuthService } from '@core/auth/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, NavbarPrivate, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected auth = inject(AuthService);
}
