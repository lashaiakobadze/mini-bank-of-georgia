import { Validators, AbstractControl, ValidationErrors } from '@angular/forms';


export class BGValidators extends Validators {
  static required(control: AbstractControl) {
    return super.required(control) ? { required: 'აუცილებელი ველი' } : undefined;
  }

  static minLengthCustom(control: AbstractControl): {[key: string]: any} | null {
    return  control.value && control.value.length < 2 ? { minLength: 'გთხოვთ შეიყვანოთ მინიმუმ 2 სიმბოლო' } : undefined;
  }

  static maxLengthCustom(control: AbstractControl): {[key: string]: any} | null {
    return  control.value && control.value.length > 30 ? { maxLength: 'გთხოვთ შეიყვანოთ მაქსიმუმ 30 სიმბოლო' } : undefined;
  }

  static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    return (control.value as string)?.indexOf(' ') !== -1 ? { cannotContainSpace: 'დაუშვებელია space-ები' } : undefined;
  }

  static minNumber(control: AbstractControl): ValidationErrors | null {
    return (control.value as number) < 0 ? { minValue: 'გთხოვთ შეიყვანოთ მინიმუმ 0' } : undefined;
  }

  static matchValues(matchTo: string): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return  !!control.parent &&
              !!control.parent.value &&
              control.value === control.parent.controls[matchTo].value ?
              undefined : { isMatching: 'პაროლები არ ემთხვევა' };
    };
  }

}
