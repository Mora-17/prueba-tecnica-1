import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Department } from '../models/department.model';

@Injectable({ providedIn: 'root' })
export class DepartmentService {
	private departments: Department[] = [
		{ id: 1, name: 'TI' },
		{ id: 2, name: 'Diseño' }
	];
	private nextId = 3;

	getAll(): Observable<Department[]> {
		return of(this.departments.slice());
	}

	getById(id: number): Observable<Department | undefined> {
		return of(this.departments.find(d => d.id === id));
	}

	create(dep: Partial<Department>): Observable<Department> {
		const newDep: Department = { id: this.nextId++, name: dep.name || '' };
		this.departments.push(newDep);
		return of(newDep);
	}

	update(dep: Department): Observable<Department> {
		const idx = this.departments.findIndex(d => d.id === dep.id);
		if (idx > -1) this.departments[idx] = { ...dep };
		return of(dep);
	}

	delete(id: number): Observable<void> {
		this.departments = this.departments.filter(d => d.id !== id);
		return of(undefined);
	}
}
