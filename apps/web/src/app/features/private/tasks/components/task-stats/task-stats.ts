import { Component, input } from '@angular/core';

@Component({
  selector: 'app-task-stats',
  imports: [],
  template: `
    <div class="row g-4 mb-4">
      <div class="col-md-4">
        <div class="card stat-card p-4">
          <div class="text-muted mb-2">Total tâches</div>
          <div class="stat-number">{{ totalTasks() }}</div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card stat-card p-4">
          <div class="text-muted mb-2">Affichées</div>
          <div class="stat-number text-primary">{{ displayedTasks() }}</div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card stat-card p-4">
          <div class="text-muted mb-2">Page actuelle</div>
          <div class="stat-number text-success">{{ currentPage() }}</div>
        </div>
      </div>
    </div>
  `,
})
export class TaskStats {
  totalTasks = input<number>(0);
  displayedTasks = input<number>(0);
  currentPage = input<number>(1);
}
