import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
	selector: 'app-employee-form',
	templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent implements OnInit {
	@Input() employee?: Employee;
	@Output() saved = new EventEmitter<Employee>();
	model: Partial<Employee> = {};

	constructor(private empService: EmployeeService) {}

	ngOnInit() {
		if (this.employee) this.model = { ...this.employee };
	}

	guardar() {
		if (this.model.id) {
			this.empService.update(this.model as Employee).subscribe(e => this.saved.emit(e));
		} else {
			this.empService.create(this.model).subscribe(e => this.saved.emit(e));
		}
	}
}
