import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DetailComponent } from './detail/detail.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {path:"",pathMatch:"full",component:MainComponent},
  {path:"login",component:LoginComponent},
  {path:"admin",component:AdminComponent,canActivate:[AuthGuardService]},
  {path:"detail/:countryName",component:DetailComponent,canActivate:[AuthGuardService]},
  {path:":countryName",component:MainComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
