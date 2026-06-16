import { inject, Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { AdminStats } from '../models/admin-stats';
import { Task } from '../../tasks/models/task';
import { User } from '@core/models/user';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly api = inject(ApiService);
  private readonly endpoint = 'admin';

  getStats() {
    return this.api.get<AdminStats>(`${this.endpoint}/stats`);
  }

  getTasks() {
    return this.api.get<Task[]>(`${this.endpoint}/tasks`);
  }

  deleteTask(id: string) {
    return this.api.delete<void>(`${this.endpoint}/tasks/${id}`);
  }
  getUsers() {
    return this.api.get<User[]>(`${this.endpoint}/users`);
  }
}
