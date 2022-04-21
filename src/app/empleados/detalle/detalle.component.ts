import { Component, OnInit, Input } from '@angular/core';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';
import { ModalService } from './modal.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  private fotoSeleccionada: File;

  @Input() empleado: Empleado;

  titulo: string = "Detalle Empleado";

  constructor(
    public empleadoService: EmpleadoService,
    private activateRoute: ActivatedRoute,
    public modalService: ModalService) { }

  ngOnInit(): void {
    /*
        this.activateRoute.paramMap.subscribe(param => {
          let id: number = +param.get('id');
          if (id) {
            this.empleadoService.getEmpleado(id).subscribe(empleado => {
              this.empleado = empleado;
            });
          }
        });
    */
  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    console.log(this.fotoSeleccionada);
  }

  subirFoto() {
    this.empleadoService.subirFoto(this.fotoSeleccionada, this.empleado.id).
      subscribe(empleado => {
        this.empleado = empleado;
        swal('Actualizacion', 'Actualizacion realizada con éxito', 'success');
      })
  }

  cerrarModal() {
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
  }

}
