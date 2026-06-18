import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Message } from '../../models/message';

@Component({
  selector: 'app-ai-answer',
  imports: [DatePipe],
  template: `
    <div
      class="d-flex mb-3"
      [class.justify-content-end]="msg().sender === 'user'"
      [class.justify-content-start]="msg().sender === 'ai'"
    >
      <div
        class="card shadow-sm border-0"
        [class.bg-primary]="msg().sender === 'user'"
        [class.text-white]="msg().sender === 'user'"
        [class.bg-white]="msg().sender === 'ai'"
        [class.text-dark]="msg().sender === 'ai'"
        [style.border-radius]="
          msg().sender === 'user' ? '16px 16px 0px 16px' : '16px 16px 16px 0px'
        "
        style="max-width: 75%"
      >
        <div class="card-body py-2.5 px-3">
          <p class="card-text mb-0 fs-6" style="white-space: pre-wrap; line-height: 1.5">
            {{ msg().text }}
          </p>
          <small class="d-block text-end mt-1 opacity-75" style="font-size: 0.65rem">
            {{ msg().timestamp | date: 'HH:mm' }}
          </small>
        </div>
      </div>
    </div>
  `,
})
export class AiAnswer {
  msg = input.required<Message>();
}
