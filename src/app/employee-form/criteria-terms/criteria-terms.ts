import {
  booleanAttribute,
  Component,
  input,
  InputSignal,
  model,
  ModelSignal,
  OutputRef,
} from '@angular/core';
import {
  DisabledReason,
  FormCheckboxControl,
  ValidationError,
  WithOptionalField,
} from '@angular/forms/signals';

@Component({
  selector: 'app-criteria-terms',
  imports: [],
  template: `
    <input
      type="checkbox"
      id="terms"
      class="peer"
      [checked]="checked()"
      (change)="checked.set($event.target.checked)"
      [required]="required?.()"
    />
    <label
      for="terms"
      class="font-semibold text-gray-700 peer-required:after:content-['*'] peer-required:after:text-red-500"
    >
      Accetto i termini
    </label>
  `,
  styles: ``,
  host: { class: 'flex items-center gap-2' },
})
export class CriteriaTerms implements FormCheckboxControl {
  checked: ModelSignal<boolean> = model(false);
  errors?: InputSignal<readonly WithOptionalField<ValidationError>[]> | undefined;
  disabled?: InputSignal<boolean> | undefined;
  disabledReasons?: InputSignal<readonly WithOptionalField<DisabledReason>[]> | undefined;
  readonly?: InputSignal<boolean> | undefined;
  hidden?: InputSignal<boolean> | undefined;
  invalid?: InputSignal<boolean> | undefined;
  pending?: InputSignal<boolean> | undefined;
  touched?: ModelSignal<boolean> | InputSignal<boolean> | OutputRef<boolean> | undefined;
  dirty?: InputSignal<boolean> | undefined;
  name?: InputSignal<string> | undefined;
  required? = input(false);
  min?: InputSignal<number | undefined> | undefined;
  minLength?: InputSignal<number | undefined> | undefined;
  max?: InputSignal<number | undefined> | undefined;
  maxLength?: InputSignal<number | undefined> | undefined;
  pattern?: InputSignal<readonly RegExp[]> | undefined;
}
