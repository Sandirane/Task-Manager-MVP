import { Component, inject } from '@angular/core';
import { SpinnerService } from '@core/services/spinner.service';

@Component({
  selector: 'app-spinner',
  imports: [],
  template: `
    @if (spinner.loading()) {
      <button class="btn btn-primary" disabled>
        <span class="spinner-grow spinner-grow-sm"></span>
        Loading..
      </button>
    }
  `,
})
export class Spinner {
  protected spinner = inject(SpinnerService);
}
