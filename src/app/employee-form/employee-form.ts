import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  resource,
  ResourceRef,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  apply,
  applyWhen,
  Control,
  form,
  hidden,
  minLength,
  Property,
  property,
  required,
  submit,
  validate,
} from '@angular/forms/signals';
import { confirmPasswordSchema, emailSchema } from '../utils/schema';
import { CriteriaTerms } from './criteria-terms/criteria-terms';
@Component({
  selector: 'app-employee-form',
  imports: [Control, JsonPipe, FormsModule, CriteriaTerms],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './employee-form.html',
  styles: ``,
  host: { class: 'block max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg' },
})
export default class EmployeeForm {
  #managersKey!: Property<ResourceRef<any>>;
  protected controlNewSkill = form(signal(''), (schema) => {
    required(schema, { message: 'Skill is required' });
  });

  protected formEmployee = form(
    signal({
      firstname: '',
      lastname: '',
      email: '',
      department: '',
      manager: '',
      skills: [] as string[],
      password: '',
      confirmPassword: '',
      terms: false,
    }),
    (schema) => {
      required(schema.firstname, { message: 'firstname is required' });
      // with property is possible to add metadata or validation or async data fetching
      this.#managersKey = property(schema.manager, ({ value }) => {
        const managerValue = computed(() => (value() === '' ? undefined : value()));
        return resource({
          params: () => managerValue(),
          loader: async ({ params, abortSignal }) => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users?q=${params}`, {
              signal: abortSignal,
            });
            return response.json();
          },
        });
      });
      required(schema.lastname, { message: 'lastname is required' });
      apply(schema.email, emailSchema);
      required(schema.department, { message: 'department is required' });
      hidden(schema.skills, ({ valueOf }) => valueOf(schema.department) !== 'IT');
      applyWhen(
        schema.skills,
        ({ valueOf }) => valueOf(schema.department) === 'IT',
        (skills) => {
          minLength(skills, 1, { message: 'At least one skill is required' });
        },
      );
      validate(schema.confirmPassword, confirmPasswordSchema(schema));
      required(schema.terms);
    },
  );

  managersRef = this.formEmployee.manager().property(this.#managersKey)!;

  protected selectManager(manager: { name: string }) {
    this.formEmployee.manager().value.set(manager.name);
  }

  protected addSkill() {
    this.formEmployee
      .skills()
      .value.update((values) => [...values, this.controlNewSkill().value()]);
    this.controlNewSkill().value.set('');
  }

  protected removeSkill(skill: string) {
    this.formEmployee.skills().value.update((values) => values.filter((s) => s !== skill));
  }

  protected async onSubmit() {
    // form is not submitting and value is not
    console.log(this.formEmployee().submitting());
    const statusSubmitting = submit(this.formEmployee, async (form) => {
      // here it start to submit and the value is true
      console.log(form().submitting());
      return Promise.resolve();
    });
    // here the form continue to stay in submitting status because the promise is not resolved
    console.log(this.formEmployee().submitting());
    // and awaiting the end of the submission...
    await statusSubmitting;
    // the form is not submitting anymore and return false
    console.log(this.formEmployee().submitting());
  }
}
