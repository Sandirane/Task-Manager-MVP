import { Component, inject, signal } from '@angular/core';
import { AiService } from '../../services/ai.service';
import { DatePipe, NgClass } from '@angular/common';
import { AiForm } from '../../components/ai-form/ai-form';
import { AiAnswer } from '../../components/ai-answer/ai-answer';
import { Message } from '../../models/message';

@Component({
  selector: 'app-ai-dashboard',
  imports: [AiAnswer, AiForm],
  templateUrl: './ai-dashboard.html',
  styleUrl: './ai-dashboard.css',
})
export class AiDashboard {
  private aiService = inject(AiService);

  loading = signal(false);
  messages = signal<Message[]>([]);

  onNewQuestion(text: string) {
    if (this.loading()) return;
 
    this.messages.update((prev) => [...prev, { sender: 'user', text, timestamp: new Date() }]);

    this.loading.set(true);

     
    this.aiService.analyze({ question: text }).subscribe({
      next: (response) => {
        this.messages.update((prev) => [
          ...prev,
          { sender: 'ai', text: response.answer, timestamp: new Date() },
        ]);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.messages.update((prev) => [
          ...prev,
          { sender: 'ai', text: 'Désolé, une erreur est survenue.', timestamp: new Date() },
        ]);
      },
    });
  }
}
