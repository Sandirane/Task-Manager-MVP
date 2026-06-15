import { Component, input, output } from '@angular/core';
import { TaskStatus, TaskPriority } from '../../models/task-enum';

@Component({
  selector: 'app-task-filters',
  imports: [],
  template: `
    <div class="d-flex flex-wrap align-items-center gap-2">
      <div class="row">
        <div class="col-sm-2">
          <button class="btn btn-outline-secondary btn" (click)="toggleSort.emit()">
            {{ sortDirection() === 'asc' ? 'A-Z' : 'Z-A' }}
          </button>
        </div>
        <div class="col-sm-5">
          <select class="form-select" (change)="onStatusChange($event)">
            <option value="">Tous les statuts</option>
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>
        </div>
        <div class="col-sm-5">
          <select class="form-select" (change)="onPriorityChange($event)">
            <option value="">Toutes les priorités</option>
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>
      </div>
    </div>
  `,
})
export class TaskFilters {
  sortDirection = input.required<string>();

  toggleSort = output<void>();

  statusChange = output<TaskStatus | ''>();
  priorityChange = output<TaskPriority | ''>();

  onStatusChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.statusChange.emit(value as TaskStatus | '');
  }

  onPriorityChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.priorityChange.emit(value as TaskPriority | '');
  }
}
