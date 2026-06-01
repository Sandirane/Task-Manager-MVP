import { Injectable, signal } from '@angular/core';
import { User } from '@core/models/user';
import { keycloak } from './keycloak.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = signal<User | null>(null);

  async login() {
    console.log('keycloak dans service', keycloak);
    await keycloak.login();
  }

  async logout() {
    await keycloak.logout({
      redirectUri: window.location.origin,
    });
  }
  /*
  isAuthenticated() {
    return keycloak.authenticated;
  }
  */
  isAuthenticated(): boolean {
    return !!keycloak.authenticated;
  }

  getToken() {
    return keycloak.token;
  }
  
}
