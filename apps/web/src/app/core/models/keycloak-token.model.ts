export interface KeycloakTokenParsed {
  sub?: string;

  preferred_username?: string;

  email?: string;

  given_name?: string;

  family_name?: string;

  realm_access?: {
    roles: string[];
  };

  resource_access?: {
    'task-manager-api'?: {
      roles: string[];
    };
  };
}