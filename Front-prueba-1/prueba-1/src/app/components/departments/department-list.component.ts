import { Component, OnInit } from '@angular/core';
import { Department } from '../../models/department.model';
import { DepartmentService } from '../../services/department.service';

@Component({
	selector: 'app-department-list',
	templateUrl: './department-list.component.html'
})
export class DepartmentListComponent implements OnInit {
	departments: Department[] = [];

	constructor(private depService: DepartmentService) {}

	ngOnInit() {
		this.cargar();
	}

	cargar() {
		this.depService.getAll().subscribe(lista => this.departments = lista);
	}

	eliminar(id: number) {
		this.depService.delete(id).subscribe(() => this.cargar());
	}
}
