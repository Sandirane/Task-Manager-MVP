import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Task } from '../../../tasks/models/task';

@Component({
  selector: 'app-admin-table',
  imports: [DatePipe],
  templateUrl: './admin-table.html',
  styleUrl: './admin-table.css',
})
export class AdminTable {
  tasks = input<Task[]>([]);
  isLoading = input<boolean>(false);

  deleteRequest = output<string>();

  onDelete(id: string): void {
    this.deleteRequest.emit(id);
  }

  getStatusClass(status: string): string {
    const s = status.toLowerCase();
    if (s.includes('done') || s.includes('terminé')) return 'bg-success-subtle text-success';
    if (s.includes('progress') || s.includes('cours')) return 'bg-warning-subtle text-warning';
    return 'bg-secondary-subtle text-secondary';
  }

  getPriorityClass(priority: string): string {
    const p = priority.toLowerCase();
    if (p.includes('high') || p.includes('haute') || p.includes('éler'))
      return 'bg-danger-subtle text-danger';
    if (p.includes('medium') || p.includes('moyenne')) return 'bg-info-subtle text-info';
    return 'bg-light text-dark border';
  }
}
