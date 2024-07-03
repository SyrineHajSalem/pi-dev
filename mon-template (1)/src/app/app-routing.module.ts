import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/layout/layout.module').then((m) => m.LayouttModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/acceuil/acceuil.module').then((m) => m.AcceuilModule),
  },


]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
