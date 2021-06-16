import { UserService } from './../../user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

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
      name: new FormControl(''),
      lastname: new FormControl(''),
      document_id: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
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
            id: this.id
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
}
