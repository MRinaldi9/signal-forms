import {
  FieldPath,
  FieldValidator,
  customError,
  schema,
  required,
  email,
} from '@angular/forms/signals';

export const confirmPasswordSchema = (
  path: FieldPath<{ password: string }>,
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
