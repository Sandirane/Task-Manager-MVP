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
        return 'bg-secondary-subtle text-secondary';
      case TaskStatus.IN_PROGRESS:
        return 'bg-warning-subtle text-warning';
      case TaskStatus.DONE:
        return 'bg-success-subtle text-success';
      default:
        return 'bg-primary-subtle text-primary';
    }
  }

  priorityClass(priority: TaskPriority): string {
    switch (priority) {
      case TaskPriority.LOW:
        return 'bg-secondary-subtle text-secondary border';
      case TaskPriority.MEDIUM:
        return 'bg-info-subtle text-info';
      case TaskPriority.HIGH:
        return 'bg-danger-subtle text-danger';
      default:
        return 'bg-light text-dark border';
    }
  }
}
