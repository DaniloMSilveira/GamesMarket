import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function firstUppercaseValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        const value = control.value;
        if (!value || !value.length) {
            return null;
        }

        const firstLetter = value[0];
        if (firstLetter !== firstLetter.toUpperCase()){
            return { firstLetterUppercase: true }
        }

        return null;
    }
}