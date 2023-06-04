import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {

        const value = control.value;
        if (!value) {
            return null;
        }

        const hasUpperCase = /[A-Z]+/.test(value);

        const hasLowerCase = /[a-z]+/.test(value);

        const hasNumeric = /[0-9]+/.test(value);

        const hasSpecialCharacter = /\W+/.test(value);

        const hasMinimumCharacters = value.length >= 6;

        const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialCharacter && hasMinimumCharacters;

        return !passwordValid ? { passwordStrength: true } : null;
    }
}