import { Component, inject } from '@angular/core';
import { AlertService } from '@core/services/alert.service';

@Component({
  selector: 'app-alert',
  imports: [],
  template: `
    @if (alertService.alert(); as alert) {
      <div class="alert alert-{{ alert.type }} m-3" role="alert">
        {{ alert.message }}
      </div>
    }
  `,
})
export class Alert {
  protected alertService = inject(AlertService);
}
