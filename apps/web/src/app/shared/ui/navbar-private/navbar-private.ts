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
  protected auth = inject(AuthService);

  navbarCollapsed = signal(false);

  actions: MenuAction[] = [
    {
      title: 'Accueil',
      route: '/home',
      icon: 'house',
    },
    {
      title: 'Tâches',
      route: '/tasks',
      icon: 'card-list',
    },
    {
      title: 'Assistant',
      route: '/assistant',
      icon: 'robot',
    },
    {
      title: 'Profil',
      route: '/profile',
      icon: 'person',
    },
  ];

  toggleNavbar(): void {
    this.navbarCollapsed.update((value) => !value);
  }

  logout(): void {
    this.auth.logout();
  }
}
