import { Component, signal } from '@angular/core';

export interface TechItem {
  name: string;
  icon: string;
  class: string;
}

@Component({
  selector: 'app-home',
  imports: [],
  template: `
    <div class="container py-5">
      <div class="py-4 text-center">
        <h1 class="display-4 fw-bold text-dark mb-3">TASK-MANAGER</h1>
        <p class="lead text-muted mx-auto" style="max-width: 600px;">
          Gérez vos tâches simplement, efficacement et en toute sécurité au quotidien.
        </p>
      </div>

      <div class="row align-items-stretch">
        <div class="col-lg-6">
          <div class="card border-0 shadow-sm h-100 bg-dark text-white rounded-3">
            <div class="card-body p-4 d-flex flex-column justify-content-center">
              <h3 class="d-flex align-items-center gap-2 mb-3 fw-bold text-primary-subtle">
                <i class="bi bi-card-text"></i>
                À propos du projet
              </h3>
              <p class="card-text lh-lg opacity-75 mb-0">
                TASK-MANAGER est une plateforme moderne où vous gérez vos tâches efficacement depuis
                une interface simple et sécurisée. Créez, modifiez, consultez et supprimez vos
                tâches en quelques clics. Grâce à l'authentification sécurisée, chaque utilisateur
                accède uniquement à ses propres données et peut suivre facilement l'avancement de
                son travail au quotidien.
              </p>
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="card border-0 shadow-sm h-100 rounded-3">
            <div class="card-body p-4">
              <h3 class="d-flex align-items-center gap-2 mb-4 fw-bold text-dark">
                <i class="bi bi-stack text-primary"></i>
                Stack technique
              </h3>

              <div class="d-flex flex-wrap gap-2">
                @for (tech of techStack(); track tech.name) {
                  <span
                    class="badge border rounded-3 px-3 py-2.5 d-inline-flex align-items-center fw-medium text-dark bg-light-subtle"
                  >
                    <i class="bi me-2 fs-6" [class]="tech.icon + ' ' + tech.class"></i>
                    {{ tech.name }}
                  </span>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class Home {
  techStack = signal<TechItem[]>([
    { name: 'Angular 21', icon: 'bi-hexagon-fill', class: 'text-danger' },
    { name: 'Bootstrap 5', icon: 'bi-bootstrap-fill', class: 'text-purple' },
    { name: 'Node.js / Express', icon: 'bi-node-plus-fill', class: 'text-success' },
    { name: 'Prisma', icon: 'bi-database-fill', class: 'text-info' },
    { name: 'Keycloak', icon: 'bi-shield-lock-fill', class: 'text-warning' },
    { name: 'Docker', icon: 'bi-box-seam-fill', class: 'text-primary' },
    { name: 'Gemini API', icon: 'bi-cpu-fill', class: 'text-secondary' },
  ]);
}
