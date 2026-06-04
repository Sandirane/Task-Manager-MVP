import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  template: `
    <div class="container">
      <div class="py-5 text-center">
        <h1 class="display-4 fw-bold">TASK-MANAGER</h1>
        <p class="lead text-muted">
          Gérez vos tâches simplement, efficacement et en toute sécurité.
        </p>
      </div>

      <div class="row align-items-stretch g-4">
        <div class="col-lg-6">
          <div class="card border-0 shadow-sm h-100 bg-dark text-white">
            <div class="card-body p-4">
              <h3 class="d-flex align-items-center gap-2">
                <i class="bi bi-card-text"></i>
                Description
              </h3>

              <p class="mb-0">
                TASK-MANAGER est une plateforme où vous gérez vos tâches efficacement depuis une
                interface simple et sécurisée. Créez, modifiez, consultez et supprimez vos tâches en
                quelques clics. Grâce à l'authentification sécurisée, chaque utilisateur accède
                uniquement à ses propres données et peut suivre facilement l'avancement de son
                travail au quotidien.
              </p>
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body p-4">
              <h3 class="d-flex align-items-center gap-2">
                <i class="bi bi-stack"></i>
                Stack technique
              </h3>

              <ul>
                <li>Angular 21</li>
                <li>Bootstrap 5</li>
                <li>Node.js / Express</li>
                <li>Prisma</li>
                <li>Keycloak</li>
                <li>Docker</li>
                <li>Gemini API</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class Home {}
