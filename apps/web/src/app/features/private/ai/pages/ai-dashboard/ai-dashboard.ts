import { Component, inject, signal } from '@angular/core';
import { AiService } from '../../services/ai.service';

@Component({
  selector: 'app-ai-dashboard',
  imports: [],
  templateUrl: './ai-dashboard.html',
  styleUrl: './ai-dashboard.css',
})
export class AiDashboard {
  private aiService = inject(AiService);
  question = signal('');
  loading = signal(false);
  answer = signal('');

  analyze() {
    if (!this.question().trim()) {
      return;
    }

    this.loading.set(true);

    this.aiService
      .analyze({
        question: this.question(),
      })
      .subscribe({
        next: (response) => {
          this.answer.set(response.answer);

          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
        },
      });
  }
}
