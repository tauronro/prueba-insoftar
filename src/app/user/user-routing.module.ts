//

import { FormComponent } from './components/form/form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';

const routes: Routes = [
  
  {
    path: 'form',
    component: FormComponent,
  },
  {
    path: 'list',
    component: ListComponent,
  },
  {
    path: '',
    redirectTo: '/list',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
