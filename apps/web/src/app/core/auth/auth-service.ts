import { computed, Injectable, signal } from '@angular/core';
import { keycloak } from './keycloak.config';
import { KeycloakTokenParsed } from '@core/models/keycloak-token.model';
import { User } from '@core/models/user';
import { environment } from '@config/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _user = signal<User | null>(this.getInitialUser());

  readonly user = this._user.asReadonly();

  readonly isAuthenticated = computed(() => !!this._user());
  readonly isAdmin = computed(() => this._user()?.isAdmin ?? false);

  async login(): Promise<void> {
    await keycloak.login();
  }

  async logout(): Promise<void> {
    this._user.set(null);
    await keycloak.logout({
      redirectUri: window.location.origin,
    });
  }

  getToken(): string | undefined {
    return keycloak.token;
  }

  hasRole(role: string): boolean {
    return this._user()?.roles.includes(role) ?? false;
  }

  private getInitialUser(): User | null {
    if (!keycloak.authenticated || !keycloak.tokenParsed) {
      return null;
    }

    const token = keycloak.tokenParsed as KeycloakTokenParsed;
    const clientId = environment.keycloak.clientId;
    const roles =
      token.resource_access?.[clientId as keyof typeof token.resource_access]?.roles ?? [];

    return {
      id: token.sub ?? '',
      username: token.preferred_username ?? '',
      email: token.email ?? '',
      firstName: token.given_name ?? '',
      lastName: token.family_name ?? '',
      roles,
      isAdmin: roles.includes('admin'),
    };
  }
}
