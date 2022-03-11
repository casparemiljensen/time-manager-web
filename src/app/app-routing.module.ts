import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeDetailComponent } from './employees/employee-detail/employee-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TimeregistrationsComponent } from './timeregistrations/timeregistrations.component';
import { TimeregistrationDetailComponent } from './timeregistrations/timeregistration-detail/timeregistration-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'employees', component: EmployeesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'employees/detail/:id', component: EmployeeDetailComponent },
  { path: 'timeregistrations', component: TimeregistrationsComponent},
  { path: 'timeregistrations/detail/:id', component: TimeregistrationDetailComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
