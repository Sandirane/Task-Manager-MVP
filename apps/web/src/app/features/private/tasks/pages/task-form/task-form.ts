import { Component, effect, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { TaskStatus } from '../../models/task-status.enum';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap, of } from 'rxjs';

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

  id = input<string | null>(null);
  protected readonly statusOptions = Object.values(TaskStatus);

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
    status: [TaskStatus.TODO],
  });

  private _syncForm = effect(() => {
    const taskData = this.task();
    if (taskData) {
      this.form.patchValue(taskData);
    } else {
      this.form.reset();
    }
  });

  cancel() {
    this.router.navigate(['/tasks']);
  }

  save() {
    if (this.form.invalid) return;

    const payload = this.form.getRawValue();
    const taskId = this.id();

    const request$ = taskId
      ? this.tasksService.updateTask(taskId, payload)
      : this.tasksService.createTask(payload);

    request$.subscribe(() => {
      this.router.navigate(['/tasks']);
    });
  }
}
