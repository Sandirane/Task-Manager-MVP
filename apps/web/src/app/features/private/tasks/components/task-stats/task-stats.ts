import { Component, input, computed } from '@angular/core';

export interface StatItem {
  label: string;
  value: number;
  icon: string;
  colorClass: string;
  bgClass: string;
  borderColor: string;
}

@Component({
  selector: 'app-task-stats',
  imports: [],
  template: `
    <div class="row g-4 mb-4">
      @for (stat of stats(); track stat.label) {
        <div class="col-md-4">
          <div
            class="card border-0 border-start border-3 shadow-sm rounded-3 p-4 bg-white h-100"
            [class]="stat.borderColor"
          >
            <div class="d-flex align-items-center justify-content-between">
              <div>
                <div
                  class="text-muted small fw-medium text-uppercase mb-1"
                  style="letter-spacing: 0.5px;"
                >
                  {{ stat.label }}
                </div>
                <div class="fs-2 fw-bold text-dark lh-1">
                  {{ stat.value }}
                </div>
              </div>

              <div
                class="fs-4 rounded-3 px-3 py-2.5 d-flex align-items-center justify-content-center shadow-sm"
                [class]="stat.bgClass + ' ' + stat.colorClass"
              >
                <i class="bi" [class]="stat.icon"></i>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export class TaskStats {
  totalTasks = input<number>(0);
  displayedTasks = input<number>(0);
  currentPage = input<number>(1);

  protected stats = computed<StatItem[]>(() => [
    {
      label: 'Total tâches',
      value: this.totalTasks(),
      icon: 'bi-list-task',
      colorClass: 'text-secondary',
      bgClass: 'bg-secondary-subtle',
      borderColor: 'border-secondary',
    },
    {
      label: 'Tâches filtrées',
      value: this.displayedTasks(),
      icon: 'bi-filter-square',
      colorClass: 'text-primary',
      bgClass: 'bg-primary-subtle',
      borderColor: 'border-primary',
    },
    {
      label: 'Page actuelle',
      value: this.currentPage(),
      icon: 'bi-file-earmark-text',
      colorClass: 'text-success',
      bgClass: 'bg-success-subtle',
      borderColor: 'border-success',
    },
  ]);
}
