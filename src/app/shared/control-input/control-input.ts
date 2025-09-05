import { Component, InputSignal, model, ModelSignal, OutputRef } from '@angular/core';
import {
  DisabledReason,
  FormValueControl,
  ValidationError,
  WithOptionalField,
} from '@angular/forms/signals';
@Component({
  selector: 'app-control-input',
  imports: [],
  template: `
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
  `,
  styles: ``,
})
export class ControlInput implements FormValueControl<string> {
  value = model<string>('');
  checked?: undefined;
  errors?: InputSignal<readonly WithOptionalField<ValidationError>[]> | undefined;
  disabled?: InputSignal<boolean> | undefined;
  disabledReasons?: InputSignal<readonly WithOptionalField<DisabledReason>[]> | undefined;
  readonly?: InputSignal<boolean> | undefined;
  hidden?: InputSignal<boolean> | undefined;
  invalid?: InputSignal<boolean> | undefined;
  pending?: InputSignal<boolean> | undefined;
  touched?: InputSignal<boolean> | ModelSignal<boolean> | OutputRef<boolean> | undefined;
  dirty?: InputSignal<boolean> | undefined;
  name?: InputSignal<string> | undefined;
  required?: InputSignal<boolean> | undefined;
  min?: InputSignal<number | undefined> | undefined;
  minLength?: InputSignal<number | undefined> | undefined;
  max?: InputSignal<number | undefined> | undefined;
  maxLength?: InputSignal<number | undefined> | undefined;
  pattern?: InputSignal<readonly RegExp[]> | undefined;
}
