import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Department } from '../../models/department.model';
import { DepartmentService } from '../../services/department.service';

@Component({
	selector: 'app-department-form',
	templateUrl: './department-form.component.html'
})
export class DepartmentFormComponent implements OnInit {
	@Input() department?: Department;
	@Output() saved = new EventEmitter<Department>();
	model: Partial<Department> = {};

	constructor(private depService: DepartmentService) {}

	ngOnInit() {
		if (this.department) this.model = { ...this.department };
	}

	guardar() {
		if ((this.model as Department).id) {
			this.depService.update(this.model as Department).subscribe(d => this.saved.emit(d));
		} else {
			this.depService.create(this.model).subscribe(d => this.saved.emit(d));
		}
	}
}
