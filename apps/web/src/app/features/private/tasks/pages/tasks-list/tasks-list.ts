import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskTable } from '../../components/task-table/task-table';
import { TaskPagination } from '../../components/task-pagination/task-pagination';
import { TaskSearch } from '../../components/task-search/task-search';
import { AlertService } from '@core/services/alert.service';
import { TaskStateService } from '../../services/task-state.service';
import { TaskFilters } from '../../components/task-filters/task-filters';
import { TaskStats } from '../../components/task-stats/task-stats';
import { ConfirmModal } from '@shared/ui/confirm-modal/confirm-modal';

@Component({
  selector: 'app-tasks-list',
  imports: [
    RouterLink,
    TaskTable,
    TaskPagination,
    TaskSearch,
    TaskStats,
    TaskFilters,
    ConfirmModal,
  ],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.css',
})
export class TasksList {
  private readonly alertService = inject(AlertService);
  readonly state = inject(TaskStateService);

  readonly pageSizeOptions = [3, 5, 10];
  readonly defaultPageSize = 3;

  isModalOpen = signal(false);
  taskIdToDelete = signal<string | null>(null);

  changePageSize(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.state.setPageSize(Number(value));
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

    this.state.deleteTask(id).subscribe({
      next: () => {
        this.alertService.show('Tâche supprimée avec succès', 'success');
        this.closeModal();
        this.state.reload();
      },
    });
  }
}
