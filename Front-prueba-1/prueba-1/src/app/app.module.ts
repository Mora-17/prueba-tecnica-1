import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routes';

import { AppComponent } from './app.component';
import { EmployeeListComponent } from './components/employees/employee-list.component';
import { EmployeeFormComponent } from './components/employees/employee-form.component';
import { DepartmentListComponent } from './components/departments/department-list.component';
import { DepartmentFormComponent } from './components/departments/department-form.component';
import { DepartmentEmployeesComponent } from './components/department-employees/department-employees.component';

@NgModule({
	declarations: [
		AppComponent,
		EmployeeListComponent,
		EmployeeFormComponent,
		DepartmentListComponent,
		DepartmentFormComponent,
		DepartmentEmployeesComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}