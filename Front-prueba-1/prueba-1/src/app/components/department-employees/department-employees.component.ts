import { Component, Input, OnChanges } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
	selector: 'app-department-employees',
	templateUrl: './department-employees.component.html'
})
export class DepartmentEmployeesComponent implements OnChanges {
	@Input() departmentId?: number;
	employees: Employee[] = [];

	constructor(private empService: EmployeeService) {}

	ngOnChanges() {
		this.cargar();
	}

	cargar() {
		if (this.departmentId == null) {
			this.employees = [];
			return;
		}
		this.empService.getAll().subscribe(lista => {
			this.employees = lista.filter(e => e.departmentId === this.departmentId);
		});
	}
}
