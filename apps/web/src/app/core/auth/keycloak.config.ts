import Keycloak from 'keycloak-js';
import { environment } from '@config/environment.development';

export const keycloak = new Keycloak({
  url: environment.keycloak.url,
  realm: environment.keycloak.realm,
  clientId: environment.keycloak.clientId,
});

export async function initializeKeycloak() {
  const authenticated = await keycloak.init({
    onLoad: 'check-sso',
    pkceMethod: 'S256',
  });

  console.log('Keycloak initialized');
  console.log('Authenticated:', authenticated);

  return authenticated;
}
