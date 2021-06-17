import { UserService } from './../../user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { UniqueFieldValidator } from './unique-field.validator';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  form: FormGroup;
  id: string | null = null;

  constructor(private userSvc: UserService, route: ActivatedRoute) {
    console.log(route.snapshot.params?.id);

    this.form = new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      document_id: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9,$]*$/),
        //UniqueFieldValidator.createValidator(userSvc, 'document_id'),
      ]),
      email: new FormControl('', [
        Validators.pattern(/\S+@\S+\.\S+/),
        //UniqueFieldValidator.createValidator(userSvc, 'email'),
      ]),
      phone: new FormControl('', [Validators.pattern(/^[0-9,$]*$/)]),
    });

    if (route.snapshot.params?.id) {
      this.id = route.snapshot.params.id as string;

      this.userSvc
        .getById(this.id)
        .pipe(take(1))
        .subscribe(({ name, lastname, email, phone, document_id }) => {
          this.form.patchValue({
            name,
            lastname,
            email,
            document_id,
            phone,
            id: this.id,
          });
        });
    }
  }

  ngOnInit(): void {}

  onSave(event: Event) {
    event.stopPropagation();
    event.preventDefault();

    if (this.form.valid) {
      this.userSvc.save(this.form.value).then(() => {
        console.log('saved');
      });
      console.log(this.form.value);
    } else {
      console.log('error');
    }
  }

  get name() {
    return this.form.get('name');
  }
  get lastname() {
    return this.form.get('lastname');
  }
  get email() {
    return this.form.get('email');
  }
  get document_id() {
    return this.form.get('document_id');
  }
  get phone() {
    return this.form.get('phone');
  }
}
