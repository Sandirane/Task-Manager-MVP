import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  imports: [],
  template: `
    @if (isOpen()) {
      <div class="modal-backdrop fade show"></div>

      <div class="modal fade show d-block" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content border-0 shadow-lg" style="border-radius: 12px;">
            <div class="modal-header border-0 pt-4 px-4">
              <h5 class="modal-title fw-bold text-danger">{{ title() }}</h5>
              <button type="button" class="btn-close" (click)="cancel.emit()"></button>
            </div>
            <div class="modal-body px-4 py-2">
              <p class="text-muted mb-0">{{ message() }}</p>
            </div>
            <div class="modal-footer border-0 pb-4 px-4 gap-2">
              <button
                type="button"
                class="btn btn-light px-3"
                style="border-radius: 8px;"
                (click)="cancel.emit()"
              >
                Annuler
              </button>
              <button
                type="button"
                class="btn btn-danger px-3"
                style="border-radius: 8px;"
                (click)="confirm.emit()"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    }
  `,
})
export class ConfirmModal {
  isOpen = input<boolean>(false);
  title = input<string>('Confirmation');
  message = input<string>('Êtes-vous sûr de vouloir effectuer cette action ?');

  confirm = output<void>();
  cancel = output<void>();
}
