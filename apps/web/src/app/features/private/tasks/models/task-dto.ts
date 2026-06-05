import { TaskStatus } from './task-status.enum';

export interface CreateTaskDto {
  title: string;
  description?: string;
  status?: TaskStatus;
}

export type UpdateTaskDto = Partial<CreateTaskDto>;
