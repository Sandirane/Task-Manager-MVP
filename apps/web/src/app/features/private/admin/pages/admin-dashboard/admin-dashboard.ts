import { Component, inject } from '@angular/core';
import { AlertService } from '@core/services/alert.service';
import { AdminService } from '../../services/admin.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { RouterLink } from '@angular/router';
import { DashboardCard } from '../../components/dashboard-card/dashboard-card';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterLink, DashboardCard],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
  private adminService = inject(AdminService);
  private alertService = inject(AlertService);

  statsResource = rxResource({
    stream: () =>
      this.adminService.getStats().pipe(
        catchError(() => {
          this.alertService.show('Erreur chargement dashboard', 'danger');
          return of({
            totalTasks: 0,
            todoTasks: 0,
            inProgressTasks: 0,
            doneTasks: 0,
            highPriorityTasks: 0,
          });
        }),
      ),
  });
}
