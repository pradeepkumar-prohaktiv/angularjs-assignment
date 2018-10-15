import { NgModule } from '@angular/core';
import {RouterModule, Routes } from  '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import {ActivateuserComponent} from './activateuser/activateuser.component';



const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'dashboard', component: DashbaordComponent, canActivate: [AuthGuard] },
  { path: 'activate/:token', component: ActivateuserComponent },

];

@NgModule({

  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
