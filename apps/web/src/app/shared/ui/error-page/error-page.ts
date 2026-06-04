import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-error-page',
  imports: [RouterLink],
  templateUrl: './error-page.html',
  styleUrl: './error-page.css',
})
export class ErrorPage {
  code = input.required<string>();
  title = input.required<string>(); 
  message = input.required<string>();
  icon = input('exclamation-triangle');
  color = input('danger');
}
