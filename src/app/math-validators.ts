import { AbstractControl } from '@angular/forms';

export class MathValidators {
  static addition(form: AbstractControl) {
    const { firstNumber, secondNumber, answer } = form.value;
    if (firstNumber + secondNumber === parseInt(answer)) {
      return null;
    }
    return { addition: true };
  }
}
