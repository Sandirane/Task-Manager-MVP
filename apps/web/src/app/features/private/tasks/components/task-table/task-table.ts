import { Component, input, output } from '@angular/core';
import { Task } from '../../models/task';
import { RouterLink } from '@angular/router';
import { TaskStatus } from '../../models/task-status.enum';

@Component({
  selector: 'app-task-table',
  imports: [RouterLink],
  templateUrl: './task-table.html',
  styleUrl: './task-table.css',
})
export class TaskTable {
  tasks = input.required<Task[]>();

  delete = output<string>();

  statusClass(status: TaskStatus): string {
    switch (status) {
      case TaskStatus.TODO:
        return 'text-bg-secondary';

      case TaskStatus.IN_PROGRESS:
        return 'text-bg-warning';

      case TaskStatus.DONE:
        return 'text-bg-success';

      default:
        return 'text-bg-primary';
    }
  }
}
