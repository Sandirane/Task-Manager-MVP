import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-tasks',
  imports: [DatePipe],
  templateUrl: './admin-tasks.html',
  styleUrl: './admin-tasks.css',
})
export class AdminTasks {
  private adminService = inject(AdminService);

  search = signal('');
  sortDirection = signal<'asc' | 'desc'>('asc');

  tasksResource = rxResource({
    stream: () => this.adminService.getTasks(),
  });

  filteredTasks = computed(() => {
    const query = this.search().toLowerCase();

    const tasks = [...(this.tasksResource.value() ?? [])];

    const filtered = tasks.filter((task) => {
      const content = `
      ${task.title}
      ${task.description}
      ${task.username}
      `.toLowerCase();

      return content.includes(query);
    });

    filtered.sort((a, b) => {
      const result = a.title.localeCompare(b.title);

      return this.sortDirection() === 'asc' ? result : -result;
    });

    return filtered;
  });

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;

    this.search.set(input.value);
  }

  toggleSort() {
    this.sortDirection.update((d) => (d === 'asc' ? 'desc' : 'asc'));
  }

  deleteTask(id: string) {
    if (!confirm('Supprimer cette tâche ?')) {
      return;
    }

    this.adminService.deleteTask(id).subscribe({
      next: () => this.tasksResource.reload(),
    });
  }
}
