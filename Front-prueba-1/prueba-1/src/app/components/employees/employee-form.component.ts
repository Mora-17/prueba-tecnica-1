import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee, EmployeeService } from '../../services/employee.service';
import { Department, DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-employee-form',
  template: `
    <div class="container fade-in">
      <div class="card">
        <h4>{{ isEditMode ? 'Actualizar Empleado' : 'Nuevo Empleado' }}</h4>
        
        <form (ngSubmit)="guardar()" #employeeForm="ngForm">
          <div class="form-group">
            <label>Nombre *</label>
            <input 
              type="text" 
              [(ngModel)]="model.nombre" 
              name="nombre"
              placeholder="Ingrese el nombre"
              required
              #nombreInput="ngModel"
            />
            <span class="error" *ngIf="nombreInput.invalid && nombreInput.touched">
              El nombre es obligatorio
            </span>
          </div>
          
          <div class="form-group">
            <label>Primer Apellido *</label>
            <input 
              type="text" 
              [(ngModel)]="model.apellido" 
              name="apellido"
              placeholder="Ingrese el primer apellido"
              required
              #apellidoInput="ngModel"
            />
            <span class="error" *ngIf="apellidoInput.invalid && apellidoInput.touched">
              El primer apellido es obligatorio
            </span>
          </div>
          
          <div class="form-group">
            <label>Segundo Apellido</label>
            <input 
              type="text" 
              [(ngModel)]="model.apellido2" 
              name="apellido2"
              placeholder="Ingrese el segundo apellido (opcional)"
            />
          </div>
          
          <div class="form-group">
            <label>Código de Empleado *</label>
            <input 
              type="number" 
              [(ngModel)]="model.codigoEmpleado" 
              name="codigoEmpleado"
              placeholder="Ej: 1001"
              required
              [disabled]="isEditMode"
              #codigoInput="ngModel"
            />
            <small style="color: var(--gray); display: block; margin-top: 0.25rem;">
              {{ isEditMode ? 'El código no se puede modificar' : 'Este código debe ser único' }}
            </small>
            <span class="error" *ngIf="codigoInput.invalid && codigoInput.touched">
              El código de empleado es obligatorio
            </span>
          </div>
          
          <div class="form-group">
            <label>Departamento *</label>
            <select 
              [(ngModel)]="model.codigoDepartamento" 
              name="codigoDepartamento"
              required
              #deptoInput="ngModel"
            >
              <option [ngValue]="undefined">Seleccione un departamento</option>
              <option 
                *ngFor="let dep of departments" 
                [ngValue]="dep.codigoDepartamento"
              >
                {{dep.nombreDepartamento}} (Código: {{dep.codigoDepartamento}})
              </option>
            </select>
            <span class="error" *ngIf="deptoInput.invalid && deptoInput.touched">
              Debe seleccionar un departamento
            </span>
          </div>
          
          <div class="form-actions">
            <button 
              type="submit" 
              class="btn btn-primary"
              [disabled]="employeeForm.invalid || saving"
            >
              <span *ngIf="!saving">
                {{ isEditMode ? '💾 Actualizar' : '💾 Guardar' }} Empleado
              </span>
              <span *ngIf="saving">Guardando...</span>
            </button>
            <button 
              type="button" 
              class="btn btn-secondary" 
              (click)="cancelar()"
              [disabled]="saving"
            >
               Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .error {
      color: var(--danger);
      font-size: 0.875rem;
      margin-top: 0.25rem;
      display: block;
    }
    
    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }
    
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class EmployeeFormComponent implements OnInit {
  model: Partial<Employee> = {};
  departments: Department[] = [];
  isEditMode = false;
  employeeId?: string;
  saving = false;

  constructor(
    private empService: EmployeeService,
    private depService: DepartmentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cargarDepartamentos();
    
    
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.employeeId = params['id'];
        this.isEditMode = true;
        this.cargarEmpleado(this.employeeId);
      }
    });
  }

  cargarDepartamentos() {
    this.depService.getAll().subscribe({
      next: (deps) => this.departments = deps,
      error: (err) => {
        console.error('Error cargando departamentos:', err);
        alert('Error al cargar los departamentos');
      }
    });
  }

  cargarEmpleado(id: string) {
    this.empService.getById(id).subscribe({
      next: (emp) => {
        this.model = { ...emp };
      },
      error: (err) => {
        console.error('Error cargando empleado:', err);
        alert('Error al cargar el empleado');
        this.router.navigate(['/empleados']);
      }
    });
  }

  guardar() {
    if (!this.model.nombre || !this.model.apellido || 
        !this.model.codigoEmpleado || !this.model.codigoDepartamento) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    this.saving = true;

    if (this.isEditMode && this.employeeId) {
   
      this.empService.update(this.employeeId, this.model).subscribe({
        next: () => {
          alert('Empleado actualizado exitosamente');
          this.router.navigate(['/empleados']);
        },
        error: (err) => {
          console.error('Error:', err);
          alert('Error al actualizar empleado: ' + (err.error?.mensaje || err.message));
          this.saving = false;
        }
      });
    } else {
      
      this.empService.create(this.model).subscribe({
        next: () => {
          alert('Empleado creado exitosamente');
          this.router.navigate(['/empleados']);
        },
        error: (err) => {
          console.error('Error:', err);
          alert('Error al crear empleado: ' + (err.error?.mensaje || err.message));
          this.saving = false;
        }
      });
    }
  }

  cancelar() {
    if (confirm('¿Está seguro de cancelar? Los cambios no se guardarán.')) {
      this.router.navigate(['/empleados']);
    }
  }
}