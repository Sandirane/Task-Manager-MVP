import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-task-pagination',
  imports: [],
  template: `
    <div class="d-flex align-items-center gap-2">
      <button class="btn btn-outline-primary" (click)="first.emit()" [disabled]="page() === 1">
        <i class="bi bi-chevron-double-left"></i>
      </button>

      <button class="btn btn-outline-primary" (click)="previous.emit()" [disabled]="page() === 1">
        <i class="bi bi-arrow-left-circle-fill"></i>
      </button>

      <span> Page {{ page() }} / {{ totalPages() }} </span>

      <button
        class="btn btn-outline-primary"
        (click)="next.emit()"
        [disabled]="page() === totalPages()"
      >
        <i class="bi bi-arrow-right-circle-fill"></i>
      </button>

      <button
        class="btn btn-outline-primary"
        (click)="last.emit()"
        [disabled]="page() === totalPages()"
      >
        <i class="bi bi-chevron-double-right"></i>
      </button>
    </div>
  `,
})
export class TaskPagination {
  page = input.required<number>();
  totalPages = input.required<number>();

  previous = output<void>();
  next = output<void>();

  first = output<void>();
  last = output<void>();
}
