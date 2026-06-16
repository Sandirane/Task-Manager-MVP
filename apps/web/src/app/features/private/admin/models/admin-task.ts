import { TaskPriority, TaskStatus } from '../../tasks/models/task-enum';

export interface AdminTask {
  id: string;
  title: string;
  description?: string;

  status: TaskStatus;
  priority: TaskPriority;

  createdAt: string;
  updatedAt: string;
  dueDate?: string;

  userId: string;
}
