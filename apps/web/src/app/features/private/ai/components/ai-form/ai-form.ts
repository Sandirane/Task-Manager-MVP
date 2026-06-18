import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-ai-form',
  imports: [],
  template: `
    <div class="input-group shadow-sm rounded-3 overflow-hidden border">
      <textarea
        class="form-control border-0 py-3 px-3"
        rows="2"
        placeholder="Posez votre question sur vos tâches..."
        [value]="rawQuestion()"
        (input)="rawQuestion.set($any($event.target).value)"
        (keydown.enter)="$event.preventDefault(); submitQuestion()"
        [disabled]="loading()"
        style="resize: none; background-color: #fff"
      ></textarea>

      <button
        class="btn btn-primary d-flex align-items-center justify-content-center px-4"
        (click)="submitQuestion()"
        [disabled]="loading() || !rawQuestion().trim()"
        style="min-width: 110px"
      >
        @if (loading()) {
          <span class="spinner-border spinner-border-sm" role="status"></span>
        } @else {
          <span class="fw-semibold">Envoyer <i class="bi bi-send-fill ms-1 small"></i></span>
        }
      </button>
    </div>
  `,
})
export class AiForm {
  loading = input<boolean>(false);
  sendQuestion = output<string>();

  protected rawQuestion = signal('');

  submitQuestion() {
    const text = this.rawQuestion().trim();
    if (text && !this.loading()) {
      this.sendQuestion.emit(text);
      this.rawQuestion.set('');
    }
  }
}
