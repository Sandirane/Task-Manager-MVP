import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task-detail',
  imports: [],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.css',
})
export class TaskDetail {
  private route = inject(ActivatedRoute);
  private tasksService = inject(TasksService);

  taskResource = rxResource({
    stream: () => this.tasksService.getTask(this.route.snapshot.paramMap.get('id')!),
  });
}
