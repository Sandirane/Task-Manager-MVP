import { TaskStatus, TaskPriority } from './task-enum';

export interface CreateTaskDto {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type UpdateTaskDto = Partial<CreateTaskDto>;
