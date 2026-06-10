import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-task-search',
  imports: [],
  template: `
    <div class="input-group">
      <span class="input-group-text">
        <i class="bi bi-search"></i>
      </span>

      <input
        class="form-control"
        placeholder="Rechercher..."
        [value]="value()"
        (input)="onInput($event)"
      />
    </div>
  `,
})
export class TaskSearch {
  value = input('');

  search = output<string>();

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.search.emit(input.value);
  }
}
