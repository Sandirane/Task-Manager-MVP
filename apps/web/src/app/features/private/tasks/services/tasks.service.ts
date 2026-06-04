import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Task } from '../models/task';
import { environment } from '@config/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/tasks`;

  getTasks() { 
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTask(id: string) {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }
}
