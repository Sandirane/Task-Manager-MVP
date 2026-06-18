import { Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { AdminService } from '../../services/admin.service';
import { ConfirmModal } from '@shared/ui/confirm-modal/confirm-modal';
import { AdminTable } from '../../components/admin-table/admin-table';

@Component({
  selector: 'app-admin-tasks',
  imports: [ConfirmModal, AdminTable],
  templateUrl: './admin-tasks.html',
  styleUrl: './admin-tasks.css',
})
export class AdminTasks {
  private adminService = inject(AdminService);

  search = signal('');
  sortDirection = signal<'asc' | 'desc'>('asc');

  page = signal(1);
  pageSize = signal(3);
  pageSizeOptions = [3, 5, 10, 20];

  isModalOpen = signal(false);
  taskIdToDelete = signal<string | null>(null);

  tasksResource = rxResource({
    stream: () => this.adminService.getTasks(),
  });

  filteredTasks = computed(() => {
    const query = this.search().toLowerCase();
    const tasks = [...(this.tasksResource.value() ?? [])];

    const filtered = tasks.filter((task) => {
      const content = `${task.title} ${task.description ?? ''} ${task.username}`.toLowerCase();
      return content.includes(query);
    });

    filtered.sort((a, b) => {
      const result = a.title.localeCompare(b.title);
      return this.sortDirection() === 'asc' ? result : -result;
    });

    return filtered;
  });

  paginatedTasks = computed(() => {
    const tasks = this.filteredTasks();
    const start = (this.page() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return tasks.slice(start, end);
  });

  totalPages = computed(() => {
    return Math.ceil(this.filteredTasks().length / this.pageSize()) || 1;
  });

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.search.set(input.value);
    this.page.set(1);
  }

  toggleSort() {
    this.sortDirection.update((d) => (d === 'asc' ? 'desc' : 'asc'));
    this.page.set(1);
  }

  onPageSizeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.pageSize.set(Number(select.value));
    this.page.set(1);
  }

  goToPage(p: number) {
    if (p >= 1 && p <= this.totalPages()) {
      this.page.set(p);
    }
  }

  openDeleteConfirmation(id: string): void {
    this.taskIdToDelete.set(id);
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.taskIdToDelete.set(null);
  }

  confirmDelete(): void {
    const id = this.taskIdToDelete();
    if (!id) return;

    this.adminService.deleteTask(id).subscribe({
      next: () => {
        this.closeModal();
        this.tasksResource.reload();
      },
      error: () => {
        this.closeModal();
      },
    });
  }
}
