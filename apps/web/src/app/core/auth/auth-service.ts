import { Injectable, signal } from '@angular/core';
import { User } from '@core/models/user';
import { keycloak } from './keycloak.config';
import { KeycloakTokenParsed } from '@core/models/keycloak-token.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly user = signal<User | null>(null);

  constructor() {
    this.syncUser();
  }

  async login(): Promise<void> {
    await keycloak.login();
  }

  async logout(): Promise<void> {
    this.user.set(null);

    await keycloak.logout({
      redirectUri: window.location.origin,
    });
  }

  isAuthenticated(): boolean {
    return !!keycloak.authenticated;
  }

  getToken(): string | undefined {
    return keycloak.token;
  }

  getUser(): User | null {
    return this.user();
  }

  hasRole(role: string): boolean {
    return this.user()?.roles.includes(role) ?? false;
  }

  private syncUser(): void {
    if (!keycloak.authenticated) {
      this.user.set(null);
      return;
    }

    this.loadUser();
  }

  private loadUser(): void {
    if (!keycloak.tokenParsed) {
      return;
    }

    const token = keycloak.tokenParsed as KeycloakTokenParsed;
    const roles = token.resource_access?.['task-manager-api']?.roles ?? [];

    this.user.set({
      id: token.sub ?? '',
      username: token.preferred_username ?? '',
      email: token.email ?? '',
      firstName: token.given_name ?? '',
      lastName: token.family_name ?? '',
      roles,
      isAdmin: roles.includes('admin'),
    });
  }
}
