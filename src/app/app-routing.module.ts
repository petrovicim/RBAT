import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@services/auth-guard/auth-guard.service';
import {
  AssetsComponent,
  EntitiesComponent,
  UserEditComponent,
  UsersComponent,
  LoginComponent,
  ResetPasswordComponent,
  RegisterComponent,
  NestedEntitiesComponent,
} from './component-module';

const routes: Routes = [
  { path: 'assets', component: AssetsComponent, canActivate: [AuthGuard] },
  { path: 'entities', component: EntitiesComponent, canActivate: [AuthGuard] },
  { path: 'entities/:name', component: NestedEntitiesComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users/:id', component: UserEditComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
