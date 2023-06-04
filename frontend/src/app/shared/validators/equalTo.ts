import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function equalToValidator(equalControl): ValidatorFn {
    let subscribe = false;

    return (control: AbstractControl): ValidationErrors | null => {
        if (!subscribe) {
        subscribe = true;
        equalControl.valueChanges.subscribe(() => {
            control.updateValueAndValidity();
        });
        }

        const v: string = control.value;

        return equalControl.value === v 
            ? null 
            : { equalTo: { control: equalControl, value: equalControl.value } };
    };
}