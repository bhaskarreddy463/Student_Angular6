import { AbstractControl } from '@angular/forms';

export function nameValidator(control: AbstractControl) { 
    const nameRegExp = new RegExp('^[A-z]+$');
    if(control && (control.value !== null || control.value !== undefined)){
        if(!nameRegExp.test(control.value)){
            return {
                isError:true
            }
        }
    }
    return null; 
}


export function alphaNumericValidator(control: AbstractControl) { 
    const alphaNumeric = new RegExp('^(?![0-9]*$)[a-zA-Z0-9]+$');
    if(control && (control.value !== null || control.value !== undefined)){
        if(!alphaNumeric.test(control.value)){
            return {
                isError:true
            }
        }
    }
    return null; 
}
