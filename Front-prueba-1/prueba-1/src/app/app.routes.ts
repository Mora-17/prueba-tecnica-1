
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employees/employee-list.component';
import { EmployeeFormComponent } from './components/employees/employee-form.component';
import { DepartmentListComponent } from './components/departments/department-list.component';
import { DepartmentFormComponent } from './components/departments/department-form.component';
import { DepartmentEmployeesComponent } from './components/department-employees/department-employees.component';

const routes: Routes = [
	{ path: '', redirectTo: '/empleados', pathMatch: 'full' },
	{ path: 'empleados', component: EmployeeListComponent },
	{ path: 'empleados/nuevo', component: EmployeeFormComponent },
	{ path: 'departamentos', component: DepartmentListComponent },
	{ path: 'departamentos/nuevo', component: DepartmentFormComponent },
	{ path: 'departamentos/:id/empleados', component: DepartmentEmployeesComponent },
	{ path: '**', redirectTo: '/empleados' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
