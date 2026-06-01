import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/auth-service';

export interface MenuAction {
  title: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-navbar-private',
  imports: [RouterLink],
  templateUrl: './navbar-private.html',
  styleUrl: './navbar-private.css',
})
export class NavbarPrivate {
  navbarCollapsed = signal(false);
  currentAction: MenuAction | null = null;
  protected auth = inject(AuthService);

  toggleNavbar(): void {
    this.navbarCollapsed.update((isCollapsed) => !isCollapsed);
  }

  actions: Array<MenuAction> = [
    { title: 'Acceuil', route: '/home', icon: "house" },
    { title: 'Tâches', route: '/tasks', icon: "card-list" },
    { title: 'Profile', route: '/profile', icon: "person" },
  ];

  logout() {
    this.auth.logout();
  }
}
