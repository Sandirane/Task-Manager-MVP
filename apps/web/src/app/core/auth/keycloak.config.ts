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
    //checkLoginIframe: false,
  });

  //console.log('Keycloak initialized');
  //console.log('Authenticated:', authenticated);

  keycloak.onTokenExpired = async () => {
    //console.log('Token expiré');

    try {
      await keycloak.updateToken(30);
    } catch {
      await keycloak.logout({
        redirectUri: window.location.origin,
      });
    }
  };

  return authenticated;
}
