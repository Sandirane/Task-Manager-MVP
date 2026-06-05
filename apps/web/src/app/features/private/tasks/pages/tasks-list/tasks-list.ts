import { Component, inject } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { rxResource } from '@angular/core/rxjs-interop'; 
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks-list',
  imports: [RouterLink],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.css',
})
export class TasksList {
  private tasksService = inject(TasksService);

  tasksResource = rxResource({
    stream: () => this.tasksService.getTasks(),
  });

  reloadTasks() {
    this.tasksResource.reload();
  }

  deleteTask(id: string) {
    if (!confirm('Êtes-vous sûr ?')) {
      return;
    }

    this.tasksService.deleteTask(id).subscribe({
      next: () => this.tasksResource.reload(),
    });
  }
}
