import { Component, inject } from '@angular/core';
import { AuthService } from '@core/auth/auth-service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  auth = inject(AuthService);
}
