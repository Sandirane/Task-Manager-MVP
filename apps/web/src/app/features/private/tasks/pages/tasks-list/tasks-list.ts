import { Component, inject } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-tasks-list',
  imports: [],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.css',
})
export class TasksList {
  private tasksService = inject(TasksService);

  tasksResource = rxResource({
    stream: () => this.tasksService.getTasks(),
  });
}
