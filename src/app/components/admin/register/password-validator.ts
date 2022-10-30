import { AbstractControl, ValidationErrors } from '@angular/forms';

export const PasswordStrengthValidator = function (
  control: AbstractControl
): ValidationErrors | null {
  let value: string = control.value || '';

  if (!value) {
    return null;
  }

  let upperCaseCharacters = /[A-Z]+/g;
  if (upperCaseCharacters.test(value) === false) {
    return {
      passwordStrength: `\n password has to contains Upper case characters`,
    };
  }

  let lowerCaseCharacters = /[a-z]+/g;
  if (lowerCaseCharacters.test(value) === false) {
    return {
      passwordStrength: `\n password has to contains lower case characters`,
    };
  }

  let numberCharacters = /[0-9]+/g;
  if (numberCharacters.test(value) === false) {
    return {
      passwordStrength: ` \n password has to contains number characters`,
    };
  }

  let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if (specialCharacters.test(value) === false) {
    return {
      passwordStrength: `\n password has to contains special character`,
    };
  }
  if (value.length < 8) {
    return {
      passwordStrength: `\n password has to contains minimum 8 character,current value ${value.length}`,
    };
    
  }
  if (value.length > 16) {
    return {
      passwordStrength: `\n password has to contains maximum 16 character,current value ${value.length}`,
    };
    
  }
  return null;
};
