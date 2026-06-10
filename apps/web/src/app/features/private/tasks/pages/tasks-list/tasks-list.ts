import { Component, computed, inject, signal } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TaskTable } from '../../components/task-table/task-table';
import { TaskPagination } from '../../components/task-pagination/task-pagination';
import { TaskSearch } from '../../components/task-search/task-search';

@Component({
  selector: 'app-tasks-list',
  imports: [RouterLink, TaskTable, TaskPagination, TaskSearch],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.css',
})
export class TasksList {
  private tasksService = inject(TasksService);

  tasksResource = rxResource({
    stream: () => this.tasksService.getTasks(),
  });

  search = signal('');
  page = signal(1);
  pageSize = signal(3);
  sortDirection = signal<'asc' | 'desc'>('asc');

  filteredTasks = computed(() => {
    const query = this.search().toLowerCase();
    const tasks = this.tasksResource.value() ?? [];

    const filtered = tasks.filter((task) => {
      const content = `
    ${task.title}
    ${task.description}
  `.toLowerCase();

      return content.includes(query);
    });

    return filtered.sort((a, b) => {
      const result = a.title.localeCompare(b.title);
      return this.sortDirection() === 'asc' ? result : -result;
    });
  });

  totalPages = computed(() => {
    const total = Math.ceil(this.filteredTasks().length / this.pageSize());

    return total || 1;
  });

  paginatedTasks = computed(() => {
    const start = (this.page() - 1) * this.pageSize();

    return this.filteredTasks().slice(start, start + this.pageSize());
  });

  changePageSize(event: Event) {
    const value = +(event.target as HTMLSelectElement).value;

    this.pageSize.set(value);

    this.page.set(1);
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

  onSearch(value: string) {
    this.search.set(value);
    this.page.set(1);
  }

  toggleSort() {
    this.sortDirection.update((direction) => (direction === 'asc' ? 'desc' : 'asc'));
  }

  goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages()) {
      this.page.set(pageNumber);
    }
  }

  deleteTask(id: string) {
    if (!confirm('Êtes-vous sûr ?')) return;
    this.tasksService.deleteTask(id).subscribe({
      next: () => this.tasksResource.reload(),
    });
  }
}
