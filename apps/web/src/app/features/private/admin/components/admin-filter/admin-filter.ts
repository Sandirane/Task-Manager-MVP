import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-admin-filter',
  imports: [],
  template: `
    <div class="card shadow-sm border-0 rounded-3 mb-4">
      <div class="card-body p-3">
        <div class="row g-3 align-items-center">
          <div class="col-12 col-md-6 col-lg-4">
            <div class="input-group">
              <span class="input-group-text bg-white border-end-0 text-muted">
                <i class="bi bi-search"></i>
              </span>
              <input
                type="text"
                class="form-control border-start-0 ps-0 shadow-none"
                placeholder="Rechercher par titre, description, utilisateur..."
                [value]="search()"
                (input)="onSearchChange($event)"
              />
            </div>
          </div>

          <div class="col-12 col-md-3 col-lg-2 d-flex align-items-center">
            <button
              class="btn btn-white border shadow-sm rounded-3 d-flex align-items-center gap-2 py-2"
              (click)="toggleSort()"
            >
              <span>Tri</span>
              <span class="badge bg-light text-dark border">
                {{ sortDirection() === 'asc' ? 'A-Z ↑' : 'Z-A ↓' }}
              </span>
            </button>
          </div>

          <div class="col-12 col-md-3 col-lg-6 text-md-end">
            <span class="badge bg-primary-subtle text-primary px-3 py-2 rounded-2 fs-7">
              {{ totalItems() }} tâche(s) affichée(s)
            </span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AdminFilter {
  search = model.required<string>();
  sortDirection = model.required<'asc' | 'desc'>();
  totalItems = input<number>(0);

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.search.set(input.value);
  }

  toggleSort() {
    this.sortDirection.update((d) => (d === 'asc' ? 'desc' : 'asc'));
  }
}
