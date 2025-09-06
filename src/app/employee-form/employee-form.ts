import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  apply,
  applyWhen,
  Control,
  customError,
  email,
  FieldPath,
  FieldValidator,
  form,
  hidden,
  minLength,
  Property,
  property,
  required,
  schema,
  submit,
  validate,
} from '@angular/forms/signals';
@Component({
  selector: 'app-employee-form',
  imports: [Control, JsonPipe, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './employee-form.html',
  styles: ``,
  host: { class: 'block max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg' },
})
export default class EmployeeForm {
  #key: Property<string> | undefined;
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
      // Metadata or validation
      this.#key = property(schema.firstname, () => 'pippo');
      required(schema.lastname, { message: 'lastname is required' });
      apply(schema.email, emailSchema);
      required(schema.department, { message: 'department is required' });
      hidden(schema.skills, ({ valueOf }) => valueOf(schema.department) !== 'IT');
      applyWhen(
        schema.skills,
        ({ valueOf }) => valueOf(schema.department) === 'IT',
        (skills) => {
          minLength(skills, 1, { message: 'At least one skill is required' });
        }
      );
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

  protected async onSubmit() {
    // form is not submitting and value is not
    console.log(this.formEmployee().submitting());
    let resolveOut: () => void;
    const statusSubmitting = submit(this.formEmployee, async (form) => {
      // here it start to submit and the value is true
      console.log(form().submitting(), form().valid());
      const { resolve } = Promise.withResolvers<void>();
      resolveOut = resolve;
    });
    // here the form continue to stay in submitting status because the promise is not resolved
    console.log(this.formEmployee().submitting());
    // after resolving the promise...
    resolveOut!();
    // and awaiting the end of the submission...
    await statusSubmitting;
    // the form is not submitting anymore and return false
    console.log(this.formEmployee().submitting());
  }
}

export const confirmPasswordSchema = (
  path: FieldPath<{ password: string }>
): FieldValidator<string> => {
  return ({ valueOf, value: confirmPassword }) => {
    const password = valueOf(path.password);
    if (password !== confirmPassword())
      return customError({
        kind: 'confirmPassword',
        message: 'Password do not match',
      });
    return undefined;
  };
};
export const emailSchema = schema<string>((field) => {
  required(field, { message: 'Email is required' });
  email(field, { message: 'Email is not valid' });
});
