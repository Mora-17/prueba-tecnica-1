import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
	// Datos iniciales de ejemplo
	private employees: Employee[] = [
		{ id: 1, name: 'Juan Pérez', position: 'Desarrollador', departmentId: 1 },
		{ id: 2, name: 'Ana Gómez', position: 'Diseñadora', departmentId: 2 }
	];
	private nextId = 3;

	getAll(): Observable<Employee[]> {
		return of(this.employees.slice());
	}

	getById(id: number): Observable<Employee | undefined> {
		return of(this.employees.find(e => e.id === id));
	}

	create(emp: Partial<Employee>): Observable<Employee> {
		const newEmp: Employee = { id: this.nextId++, name: emp.name || '', position: emp.position, departmentId: emp.departmentId };
		this.employees.push(newEmp);
		return of(newEmp);
	}

	update(emp: Employee): Observable<Employee> {
		const idx = this.employees.findIndex(e => e.id === emp.id);
		if (idx > -1) this.employees[idx] = { ...emp };
		return of(emp);
	}

	delete(id: number): Observable<void> {
		this.employees = this.employees.filter(e => e.id !== id);
		return of(undefined);
	}
}
