import { UserModel } from './../../models/user.model';
import { UserService } from './../../user.service';

import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class UniqueFieldValidator {
  static createValidator(
    userService: UserService,
    field: string
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return userService.getByField(field, control.value).pipe(
        map((result: UserModel[]) => {
          //validar si esta entrando al condicional bien
          console.log('entrotres',result,result.length <= 0);
          if(result.length<=0){
            console.log('null');
          }else{
            console.log('error');
          }
          return (
            result.length <= 0 ? null : { fieldExist: true }
          ) as ValidationErrors;
        })
      );
    };
  }
}
