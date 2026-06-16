import { Component, input } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  imports: [],
  template: `
    <div
      class="card h-100 border-start border-4 shadow-sm dashboard-card"
      [class]="'border-' + color()"
    >
      <div class="card-body p-4 d-flex justify-content-between align-items-center">
        <div>
          <div class="text-muted fw-semibold small mb-1">{{ title() }}</div>
          <h3 class="fw-bold m-0" [class]="'text-' + color()">{{ value() ?? 0 }}</h3>
        </div>
        <span class="badge p-3 rounded-3" [class]="'bg-' + color() + '-subtle text-' + color()">
          <i class="bi fs-4" [class]="icon()"></i>
        </span>
      </div>
    </div>
  `,
})
export class DashboardCard {
  title = input.required<string>();
  value = input<number | undefined>(0);
  icon = input.required<string>();
  color = input<string>('secondary');
}
