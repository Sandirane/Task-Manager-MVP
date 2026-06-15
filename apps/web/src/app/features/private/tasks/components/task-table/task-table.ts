import { Component, input, output } from '@angular/core';
import { Task } from '../../models/task';
import { RouterLink } from '@angular/router';
import { TaskStatus, TaskPriority } from '../../models/task-enum';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-table',
  imports: [RouterLink, DatePipe],
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

  priorityClass(priority: TaskPriority): string {
    switch (priority) {
      case TaskPriority.LOW:
        return 'text-bg-secondary';

      case TaskPriority.MEDIUM:
        return 'text-bg-warning';

      case TaskPriority.HIGH:
        return 'text-bg-danger';

      default:
        return 'text-bg-primary';
    }
  }
}
