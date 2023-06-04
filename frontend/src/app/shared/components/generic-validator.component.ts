import { FormGroup } from '@angular/forms';

export abstract class GenericValidatorComponent {

    validationMessages: ValidationMessages;

    getErrorMessage(form: FormGroup, fieldName: string){
        var fieldValidations = this.validationMessages[fieldName]
        var field = form.get(fieldName);
    
        if (!field.errors) return '';
    
        for (const validation in fieldValidations) {
          console.log(validation)
          if (field.errors[validation]){
            return fieldValidations[validation];
          }
        }
    
        return '';
    }
}

interface ValidationMessages {
    [key: string]: { [key: string]: string } 
}