import { Component, input, output, computed } from '@angular/core';
import { TaskStatus, TaskPriority } from '../../models/task-enum';

@Component({
  selector: 'app-task-filters',
  imports: [],
  template: `
    <div class="row g-2 align-items-center">
      <div class="col-sm-auto">
        <button
          class="btn btn-outline-secondary w-100 d-inline-flex align-items-center justify-content-center gap-2"
          (click)="toggleSort.emit()"
          [title]="sortDirection() === 'asc' ? 'Tri croissant' : 'Tri décroissant'"
        >
          <i
            class="bi"
            [class]="sortDirection() === 'asc' ? 'bi-sort-alpha-down' : 'bi-sort-alpha-up'"
          ></i>
          <span>{{ sortDirection() === 'asc' ? 'A-Z' : 'Z-A' }}</span>
        </button>
      </div>

      <div class="col-sm">
        <select class="form-select" (change)="onStatusChange($event)">
          <option value="">Tous les statuts</option>
          @for (status of statusOptions(); track status) {
            <option [value]="status">{{ status }}</option>
          }
        </select>
      </div>

      <div class="col-sm">
        <select class="form-select" (change)="onPriorityChange($event)">
          <option value="">Toutes les priorités</option>
          @for (priority of priorityOptions(); track priority) {
            <option [value]="priority">{{ priority }}</option>
          }
        </select>
      </div>
    </div>
  `,
})
export class TaskFilters {
  sortDirection = input.required<string>();

  toggleSort = output<void>();
  statusChange = output<TaskStatus | ''>();
  priorityChange = output<TaskPriority | ''>();

  protected statusOptions = computed(() => Object.values(TaskStatus));
  protected priorityOptions = computed(() => Object.values(TaskPriority));

  onStatusChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.statusChange.emit(value as TaskStatus | '');
  }

  onPriorityChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.priorityChange.emit(value as TaskPriority | '');
  }
}
