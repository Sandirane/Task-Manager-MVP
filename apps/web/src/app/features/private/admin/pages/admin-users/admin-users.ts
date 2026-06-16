import { Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { AdminService } from '../../services/admin.service';
import { User } from '@core/models/user';

@Component({
  selector: 'app-admin-users',
  imports: [],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css',
})
export class AdminUsers {
  private adminService = inject(AdminService);

  search = signal('');

  // Utilisation de rxResource
  usersResource = rxResource({
    stream: () => this.adminService.getUsers(),
  });

  // Filtrage sécurisé
  filteredUsers = computed<User[]>(() => {
    const query = this.search().toLowerCase();

    // 1. On récupère la valeur actuelle (sécurisé contre le undefined / null / erreur)
    const users = this.usersResource.value() ?? [];

    if (!query) return users;

    // 2. On filtre
    return users.filter((user) => {
      // Sécurité si les champs Keycloak reviennent parfois null/undefined
      const username = user.username?.toLowerCase() || '';
      const email = user.email?.toLowerCase() || '';
      const roles = user.roles?.join(' ').toLowerCase() || '';

      return username.includes(query) || email.includes(query) || roles.includes(query);
    });
  });

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.search.set(input.value);
  }
}
