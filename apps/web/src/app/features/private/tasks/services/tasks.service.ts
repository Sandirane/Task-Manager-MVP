import { inject, Injectable } from '@angular/core';
import { Task } from '../models/task';
import { CreateTaskDto, UpdateTaskDto } from '../models/task-dto';
import { ApiService } from '@core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly api = inject(ApiService);
  private readonly endpoint = 'tasks';

  getTasks() {
    return this.api.get<Task[]>(this.endpoint);
  }

  getTask(id: string) {
    return this.api.get<Task>(`${this.endpoint}/${id}`);
  }

  createTask(task: CreateTaskDto) {
    return this.api.post<Task, CreateTaskDto>(this.endpoint, task);
  }

  updateTask(id: string, task: UpdateTaskDto) {
    return this.api.put<Task, UpdateTaskDto>(`${this.endpoint}/${id}`, task);
  }

  deleteTask(id: string) {
    return this.api.delete<void>(`${this.endpoint}/${id}`);
  }
}
