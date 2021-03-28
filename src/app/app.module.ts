import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { ChartComponent } from './chart/chart.component';
import { CartGroupComponent } from './cart-group/cart-group.component';
import { TableGroupComponent } from './table-group/table-group.component';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt'
import { AuthGuardService } from './services/auth-guard.service';
import { AdminComponent } from './admin/admin.component';
import { DetailComponent } from './detail/detail.component';
import { CountryFilterPipe } from './pipes/country-filter.pipe';
import { MyDatePickerModule } from 'mydatepicker';


export function tokenGetter() {
  return localStorage.getItem("jwt")
}



@NgModule({
  declarations: [
    AppComponent,
    PieChartComponent,
    LineChartComponent,
    ChartComponent,
    CartGroupComponent,
    TableGroupComponent,
    MainComponent,
    LoginComponent,
    AdminComponent,
    DetailComponent,
    CountryFilterPipe



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:44350"],
        blacklistedRoutes: []
      }
    }),
    MyDatePickerModule,
  



  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
