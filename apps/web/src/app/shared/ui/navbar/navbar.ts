import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/auth-service';

export interface MenuAction {
  title: string;
  route: string;
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  protected auth = inject(AuthService);

  navbarCollapsed = signal(false);

  toggleNavbar(): void {
    this.navbarCollapsed.update((isCollapsed) => !isCollapsed);
  }

  actions: Array<MenuAction> = [{ title: 'Acceuil', route: '/home' }];

  login() {
    this.auth.login();
  }
}
