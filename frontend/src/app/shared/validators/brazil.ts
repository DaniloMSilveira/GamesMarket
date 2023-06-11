import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { validateBr } from 'js-brasil';

export function CPFValidator(): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {

        const value = control.value;
        if (!value) {
            return null;
        }

        const isCpf = validateBr.cpf(value);
        return !isCpf ? { cpf: true } : null;
    }
}

export function CNPJValidator(): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {

        const value = control.value;
        if (!value) {
            return null;
        }

        const isCnpj = validateBr.cnpj(value);
        return !isCnpj ? { cnpj: true } : null;
    }
}

export function CEPJValidator(): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {

        const value = control.value;
        if (!value) {
            return null;
        }

        const isCEP = validateBr.cep(value);
        return !isCEP ? { cep: true } : null;
    }
}