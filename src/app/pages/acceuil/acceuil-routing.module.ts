import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceuilComponent } from './acceuil.component';
import { RentComponent } from 'src/app/rent/rent.component';

const routes: Routes = [
  {path : '' , component : AcceuilComponent},
  {path : 'louez' , component : RentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcceuilRoutingModule { }
