import { Component, OnInit } from '@angular/core';
import { Empleado } from './empleado';
import { EmpleadoService } from './empleado.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';




interface Nacionalidad {
  value: string;
  viewValue: string;
}

interface TipoIdentificacion {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public empleado: Empleado = new Empleado();
  public titulo: string = "Crear Empleado";

  minDate: Date;
  maxDate: Date;



  nacionalidades: Nacionalidad[] = [
    {value: 'Colombia', viewValue: 'Colombia'},
    {value: 'Estados Unidos', viewValue: 'Estados Unidos'},
  ];

  tipoIdentificacion: TipoIdentificacion[] = [
    {value: 'Cédula de Ciudadanía', viewValue: 'Cédula de Ciudadanía'},
    {value: 'Cédula de Extranjería', viewValue: 'Cédula de Extranjería' },
    {value: 'Pasaporte', viewValue: 'Pasaporte'},
    {value: 'Permiso Especial', viewValue: 'Permiso Especial'},
  ];




  constructor(
    private empleadoService: EmpleadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { 
      
    const currentYear = new Date();
    let mes = 1000 * 60 * 60 * 24 * 30;
    let suma = currentYear.getTime()-mes;
      this.minDate = new Date(suma);
      this.maxDate = new Date();
    }

  ngOnInit(): void {
    this.cargarEmpleado()
  }

  cargarEmpleado(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']

      if (id) {
        this.empleadoService.getEmpleado(id).subscribe((empleado) => this.empleado = empleado)
      }

    })
  }

  public create(): void {
    this.empleadoService.create(this.empleado).subscribe(
      empleado => {
        this.router.navigate(['/empleados'])
        swal('Nuevo Empleado', `Empleado agregado al sistema con exito!`, 'success')

      }
    )
  }

  update(): void {
    this.empleadoService.updateEmpleado(this.empleado)
      .subscribe(cliente => {

        this.router.navigate(['/empleados'])
        swal('Actualizacion', 'Actualizacion realizada con éxito', 'success')
      })
  }

}
