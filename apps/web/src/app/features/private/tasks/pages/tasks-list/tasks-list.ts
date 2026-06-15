import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskTable } from '../../components/task-table/task-table';
import { TaskPagination } from '../../components/task-pagination/task-pagination';
import { TaskSearch } from '../../components/task-search/task-search';
import { AlertService } from '@core/services/alert.service';
import { TaskStateService } from '../../services/task-state.service';
import { TaskFilters } from '../../components/task-filters/task-filters';
import { TaskStats } from '../../components/task-stats/task-stats';

@Component({
  selector: 'app-tasks-list',
  imports: [RouterLink, TaskTable, TaskPagination, TaskSearch, TaskStats, TaskFilters],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.css',
})
export class TasksList {
  private readonly alertService = inject(AlertService);
  readonly state = inject(TaskStateService);

  changePageSize(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.state.setPageSize(Number(value));
  }

  deleteTask(id: string): void {
    if (!confirm('Êtes-vous sûr ?')) return;

    this.state.deleteTask(id).subscribe({
      next: () => {
        this.alertService.show('Tâche supprimée avec succès', 'success');
        this.state.reload();
      },
    });
  }
}
