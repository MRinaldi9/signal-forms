import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  apply,
  Control,
  email,
  FieldPath,
  FieldValidator,
  form,
  hidden,
  required,
  schema,
  validate,
  ValidationError,
  WithoutField,
} from '@angular/forms/signals';
@Component({
  selector: 'app-employee-form',
  imports: [Control, JsonPipe, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2 class="text-2xl font-bold mb-6 text-gray-800">Informazioni Dipendente</h2>
    <form class="space-y-6" (ngSubmit)="onSubmit()">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="flex flex-col">
          <label for="firstname" class="mb-2 font-semibold text-gray-700">Nome</label>
          <input
            id="firstname"
            class="border-gray-300 border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            [control]="formEmployee.firstname"
          />
          @if(formEmployee.firstname().invalid() && formEmployee.firstname().dirty()){
          <small class="text-red-500 mt-1">{{
            formEmployee.firstname().errors()[0].message
          }}</small>
          }
        </div>

        <div class="flex flex-col">
          <label for="lastname" class="mb-2 font-semibold text-gray-700">Cognome</label>
          <input
            id="lastname"
            class="border-gray-300 border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            [control]="formEmployee.lastname"
          />
          @if(formEmployee.lastname().invalid() && formEmployee.lastname().dirty()){
          <small class="text-red-500 mt-1">{{ formEmployee.lastname().errors()[0].message }}</small>
          }
        </div>
      </div>

      <div class="flex flex-col">
        <label for="email" class="mb-2 font-semibold text-gray-700">Email</label>
        <input
          id="email"
          class="border-gray-300 border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          [control]="formEmployee.email"
          type="email"
        />
        @if(formEmployee.email().invalid() && formEmployee.email().dirty()){
        <small class="text-red-500 mt-1">{{ formEmployee.email().errors()[0].message }}</small>
        }
      </div>

      <div class="flex flex-col">
        <label for="department" class="mb-2 font-semibold text-gray-700">Reparto</label>
        <select
          id="department"
          class="border-gray-300 border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          [control]="formEmployee.department"
        >
          <option value="">-- Seleziona --</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Sales">Sales</option>
        </select>
      </div>

      @if(!formEmployee.skills().hidden()){
      <div class="flex flex-col space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 class="font-semibold text-gray-800">Skill Tecniche</h4>
        <div class="space-y-2">
          @for (skill of formEmployee.skills; track skill) {
          <div class="flex items-center gap-2">
            <input
              class="flex-grow border-gray-300 border p-2 rounded-md bg-gray-100"
              [control]="skill"
              readonly
            />
            <button
              type="button"
              (click)="removeSkill(skill().value())"
              class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
            >
              Rimuovi
            </button>
          </div>
          }
        </div>
        <div class="flex items-center gap-2 pt-2">
          <input
            type="text"
            placeholder="Aggiungi una skill tecnica"
            [control]="controlNewSkill"
            class="flex-grow border-gray-300 border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          <button
            type="button"
            [disabled]="controlNewSkill().invalid()"
            (click)="addSkill()"
            class="bg-blue-600 text-white font-semibold px-4 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            Aggiungi
          </button>
        </div>
      </div>
      }
      <div class="flex flex-col">
        <label for="password" class="mb-2 font-semibold text-gray-700">Password</label>
        <input
          id="password"
          class="border-gray-300 border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          [control]="formEmployee.password"
          type="password"
        />
        @if(formEmployee.password().invalid() && formEmployee.password().dirty()){
        <small class="text-red-500 mt-1">{{ formEmployee.password().errors()[0].message }}</small>
        }
      </div>
      <div class="flex flex-col">
        <label
          for="confirm-password"
          class="mb-2 font-semibold text-gray-700 peer-required:after:content-['*'] peer-required:after:text-red-500"
          >Confirm Password</label
        >
        <input
          id="confirm-password"
          class="peer border-gray-300 border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          [control]="formEmployee.confirmPassword"
          type="email"
        />
        @if(formEmployee.confirmPassword().invalid() && formEmployee.confirmPassword().dirty()){
        <small class="text-red-500 mt-1">{{
          formEmployee.confirmPassword().errors()[0].message
        }}</small>
        }
      </div>
      <div class="flex items-center gap-2">
        <input type="checkbox" id="terms" class="peer" [control]="formEmployee.terms" />
        <label
          for="terms"
          class="font-semibold text-gray-700 peer-required:after:content-['*'] peer-required:after:text-red-500"
        >
          Accetto i termini
        </label>
      </div>

      <button
        type="submit"
        [disabled]="formEmployee().invalid()"
        class="bg-blue-600 text-white font-semibold px-4 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
      >
        Submit
      </button>
    </form>

    <!-- Debug -->
    <details class="mt-4">
      <summary class="cursor-pointer font-semibold text-gray-700">Debug</summary>
      <fieldset class="border rounded-xl p-3 mt-2 bg-gray-50">
        <pre class="text-sm text-gray-800">{{ formEmployee().value() | json }}</pre>
      </fieldset>
    </details>
  `,
  styles: ``,
  host: { class: 'block max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg' },
})
export default class EmployeeForm {
  protected controlNewSkill = form(signal(''), (schema) => {
    required(schema, { message: 'Skill is required' });
  });

  protected formEmployee = form(
    signal({
      firstname: '',
      lastname: '',
      email: '',
      department: '',
      skills: [] as string[],
      password: '',
      confirmPassword: '',
      terms: false,
    }),
    (schema) => {
      required(schema.firstname, { message: 'firstname is required' });
      required(schema.lastname, { message: 'lastname is required' });
      apply(schema.email, emailSchema);
      required(schema.department, { message: 'department is required' });
      hidden(schema.skills, ({ valueOf }) => valueOf(schema.department) !== 'IT');
      validate(schema.confirmPassword, confirmPasswordSchema(schema));
      required(schema.terms);
    }
  );

  protected addSkill() {
    this.formEmployee
      .skills()
      .value.update((values) => [...values, this.controlNewSkill().value()]);
    this.controlNewSkill().value.set('');
  }

  protected removeSkill(skill: string) {
    this.formEmployee.skills().value.update((values) => values.filter((s) => s !== skill));
  }

  protected onSubmit() {
    console.log(this.formEmployee().value());
  }
}

export const confirmPasswordSchema = (
  path: FieldPath<{ password: string }>
): FieldValidator<string> => {
  return ({ valueOf, value: confirmPassword }) => {
    const password = valueOf(path.password);
    if (password !== confirmPassword())
      return {
        kind: 'confirmPassword',
        message: 'Password do not match',
      } as WithoutField<ValidationError>;
    return undefined;
  };
};
export const emailSchema = schema<string>((field) => {
  required(field, { message: 'Email is required' });
  email(field, { message: 'Email is not valid' });
});
