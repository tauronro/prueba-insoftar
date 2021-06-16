import { Observable } from 'rxjs';
import { UserModel } from './../../models/user.model';
import { UserService } from './../../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  users$: Observable<UserModel[]>;

  constructor(private userSvc: UserService) {
    this.users$ = userSvc.getAll();
  }

  ngOnInit(): void {}

  onDelete(event: Event, user: UserModel) {
    event.preventDefault();
    event.stopPropagation();

    if (confirm(`Seguro que desea eliminar a ${user.name} ${user.lastname}?`)) {
      this.userSvc.delete(user.id as string).then(()=>{
        alert('Se eliminó correctamente')
      })
    }

  }
}
