import { Component } from '@angular/core';
import { ErrorPage } from '@shared/ui/error-page/error-page';

@Component({
  selector: 'app-unauthorized',
  imports: [ErrorPage],
  template: `
    <app-error-page
      code="401"
      title="Accès refusé"
      message="Session expiré veuillez vous reconnecter."
      icon="compass"
      color="warning"
    />
  `,
})
export class Unauthorized {}
