import { Component, computed, inject } from '@angular/core';
import { AuthService } from '@core/auth/auth-service';

export interface ProfileField {
  label: string;
  value: string;
  iconClass: string;
}

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  auth = inject(AuthService);

  profileFields = computed<ProfileField[]>(() => {
    const user = this.auth.user();
    if (!user) return [];

    return [
      {
        label: 'Prénom',
        value: user.firstName,
        iconClass: 'bi-person'
      },
      {
        label: 'Nom',
        value: user.lastName,
        iconClass: 'bi-person-fill'
      },
      {
        label: "Nom d'utilisateur",
        value: user.username,
        iconClass: 'bi-at'
      },
      {
        label: 'Adresse email',
        value: user.email,
        iconClass: 'bi-envelope'
      }
    ];
  });
}
