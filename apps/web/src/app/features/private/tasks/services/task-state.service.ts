import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { AlertService } from '@core/services/alert.service';
import { catchError, of } from 'rxjs';
import { TaskStatus, TaskPriority } from '../models/task-enum';
import { TasksService } from './tasks.service';

@Injectable({
  providedIn: 'root',
})
export class TaskStateService {
  
  private tasksService = inject(TasksService);
  private alertService = inject(AlertService);

  tasksResource = rxResource({
    stream: () =>
      this.tasksService.getTasks().pipe(
        catchError(() => {
          this.alertService.show('Erreur chargement tâches', 'danger');
          return of([]);
        }),
      ),
  });

  search = signal('');
  page = signal(1);
  pageSize = signal(3);
  sortDirection = signal<'asc' | 'desc'>('asc');

  statusFilter = signal<TaskStatus | ''>('');
  priorityFilter = signal<TaskPriority | ''>('');

  filteredTasks = computed(() => {
    const query = this.search().toLowerCase();
    const tasks = this.tasksResource.value() ?? [];

    return tasks
      .filter((task) => {
        const content = `
          ${task.title}
          ${task.description}
        `.toLowerCase();

        if (this.statusFilter() && task.status !== this.statusFilter()) {
          return false;
        }

        if (this.priorityFilter() && task.priority !== this.priorityFilter()) {
          return false;
        }

        return content.includes(query);
      })
      .sort((a, b) => {
        const result = a.title.localeCompare(b.title);

        return this.sortDirection() === 'asc' ? result : -result;
      });
  });

  totalPages = computed(() => {
    return Math.ceil(this.filteredTasks().length / this.pageSize()) || 1;
  });

  paginatedTasks = computed(() => {
    const start = (this.page() - 1) * this.pageSize();

    return this.filteredTasks().slice(start, start + this.pageSize());
  });

  setSearch(value: string) {
    this.search.set(value);
    this.page.set(1);
  }

  setStatusFilter(status: TaskStatus | '') {
    this.statusFilter.set(status);
    this.page.set(1);
  }

  setPriorityFilter(priority: TaskPriority | '') {
    this.priorityFilter.set(priority);
    this.page.set(1);
  }

  setPageSize(size: number) {
    this.pageSize.set(size);
    this.page.set(1);
  }

  toggleSort() {
    this.sortDirection.update((dir) => (dir === 'asc' ? 'desc' : 'asc'));
  }

  nextPage() {
    if (this.page() < this.totalPages()) {
      this.page.update((p) => p + 1);
    }
  }

  previousPage() {
    if (this.page() > 1) {
      this.page.update((p) => p - 1);
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.page.set(page);
    }
  }

  goToFirstPage(): void {
    this.page.set(1);
  }

  goToLastPage(): void {
    this.page.set(this.totalPages());
  }

  deleteTask(id: string) {
    return this.tasksService.deleteTask(id);
  }

  reload() {
    this.tasksResource.reload();
  }
}
