import {
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export const validarClaves: ValidatorFn = (
  control: FormGroup
): ValidationErrors | any => {
  const clave = control.get('clave');
  const contrasena2 = control.get('contrasena2');

  return clave?.value === contrasena2?.value ? null : { error: true };
};
