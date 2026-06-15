import { Component, effect, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { TaskPriority, TaskStatus } from '../../models/task-enum';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap, of } from 'rxjs';
import { AlertService } from '@core/services/alert.service';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
  private fb = inject(FormBuilder);
  private tasksService = inject(TasksService);
  private router = inject(Router);
  private alertService = inject(AlertService);

  id = input<string | null>(null);
  protected readonly statusOptions = Object.values(TaskStatus);
  protected readonly priorityOptions = Object.values(TaskPriority);

  task = toSignal(
    toObservable(this.id).pipe(
      switchMap((taskId) => {
        if (!taskId) return of(null);
        return this.tasksService.getTask(taskId);
      }),
    ),
  );

  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: [''],
    dueDate: [''],
    priority: [TaskPriority.LOW],
    status: [TaskStatus.TODO],
  });

  private _syncForm = effect(() => {
    const taskData = this.task();

    if (taskData && this.id()) {
      this.form.patchValue(taskData);
    } else if (!this.id()) {
      this.form.reset();
    }
  });

  cancel() {
    this.router.navigate(['/tasks']);
  }

  save() {
    if (this.form.invalid) return;
    const raw = this.form.getRawValue();
    const payload = {
      ...raw,
      dueDate: raw.dueDate ? new Date(raw.dueDate).toISOString() : undefined,
    };
    const taskId = this.id();

    const request$ = taskId
      ? this.tasksService.updateTask(taskId, payload)
      : this.tasksService.createTask(payload);

    const successMessage = taskId ? 'Tâche mise à jour avec succès' : 'Tâche créée avec succès';

    request$.subscribe({
      next: () => {
        this.alertService.show(successMessage, 'success');
        this.router.navigate(['/tasks']);
      },
      error: () => {
        this.alertService.show('Erreur lors de l’enregistrement', 'danger');
      },
    });
  }
}
