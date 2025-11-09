import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
	selector: 'app-employee-list',
	templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {
	employees: Employee[] = [];

	constructor(private empService: EmployeeService) {}

	ngOnInit() {
		this.cargar();
	}

	cargar() {
		this.empService.getAll().subscribe(lista => this.employees = lista);
	}

	eliminar(id: number) {
		this.empService.delete(id).subscribe(() => this.cargar());
	}
}
