import { Component, computed, input, model } from '@angular/core';

@Component({
  selector: 'app-admin-pagination',
  imports: [],
  template: `
    <div
      class="card-footer bg-white border-top d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3 py-3 px-4"
    >
      <div class="d-flex align-items-center gap-2 text-muted small">
        <span>Afficher</span>
        <select
          class="form-select form-select-sm shadow-none"
          style="width: 70px"
          [value]="pageSize()"
          (change)="onPageSizeChange($event)"
        >
          @for (option of pageSizeOptions(); track option) {
            <option [value]="option">{{ option }}</option>
          }
        </select>
        <span>éléments par page</span>
      </div>

      <nav aria-label="Navigation" class="mb-0">
        <ul class="pagination pagination-sm mb-0">
          <li class="page-item" [class.disabled]="page() === 1">
            <button class="page-link shadow-none" (click)="goToPage(page() - 1)">&laquo;</button>
          </li>

          @for (item of pagesArray(); track $index) {
            <li class="page-item" [class.active]="page() === $index + 1">
              <button class="page-link shadow-none" (click)="goToPage($index + 1)">
                {{ $index + 1 }}
              </button>
            </li>
          }

          <li class="page-item" [class.disabled]="page() === totalPages()">
            <button class="page-link shadow-none" (click)="goToPage(page() + 1)">&raquo;</button>
          </li>
        </ul>
      </nav>
    </div>
  `,
})
export class AdminPagination {
  page = model.required<number>();
  pageSize = model.required<number>();
  totalPages = input.required<number>();
  pageSizeOptions = input<number[]>([3, 5, 10, 20]);

  protected pagesArray = computed(() => new Array(this.totalPages()));

  onPageSizeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.pageSize.set(Number(select.value));
  }

  goToPage(p: number) {
    if (p >= 1 && p <= this.totalPages()) {
      this.page.set(p);
    }
  }
}
