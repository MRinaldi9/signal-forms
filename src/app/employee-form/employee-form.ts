import { Component } from '@angular/core';
import {  } from "@angular/forms/signal";
@Component({
  selector: 'app-employee-form',
  imports: [Control],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div>
        <label>Nome</label>
        <input formControlName="firstName" />
      </div>

      <div>
        <label>Cognome</label>
        <input formControlName="lastName" />
      </div>

      <div>
        <label>Email</label>
        <input formControlName="email" type="email" />
      </div>

      <div>
        <label>Reparto</label>
        <select formControlName="department">
          <option value="">-- Seleziona --</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Sales">Sales</option>
        </select>
      </div>

      <!-- TODO: mostrare skills solo se reparto === IT -->
      <div formArrayName="skills" *ngIf="form.get('department')?.value === 'IT'">
        <h4>Skill Tecniche</h4>
        <div *ngFor="let skill of skills.controls; let i = index">
          <input [formControlName]="i" />
          <button type="button" (click)="removeSkill(i)">Rimuovi</button>
        </div>
        <button type="button" (click)="addSkill()">Aggiungi skill</button>
      </div>

      <div>
        <label>Password</label>
        <input type="password" formControlName="password" />
      </div>

      <div>
        <label>Conferma Password</label>
        <input type="password" formControlName="confirmPassword" />
      </div>

      <div>
        <label>
          <input type="checkbox" formControlName="terms" />
          Accetto i termini
        </label>
      </div>

      <button type="submit">Invia</button>
    </form>

    <!-- Debug -->
    <pre>{{ form.value | json }}</pre>
  `,
  styles: ``,
})
export default class EmployeeForm {}
