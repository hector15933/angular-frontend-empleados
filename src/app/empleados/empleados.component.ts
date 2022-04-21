import { Component, OnInit, Input, ViewChild,AfterViewInit } from '@angular/core';
import { Empleado } from './empleado';
import { EMPLEADOS } from './empleados.json';
import { EmpleadoService } from './empleado.service';
import { ModalService } from './detalle/modal.service';
import Swal from 'sweetalert2';
import { DataTablesModule } from "angular-datatables";
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit,AfterViewInit  {

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();

  empleados: Empleado[];
  empleadoSeleccionado: Empleado;

  constructor(
    private empleadoService: EmpleadoService,
    public modalService: ModalService
  ) {

  }
  ngAfterViewInit(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns().every(function () {
        const that = this;
        $('input', this.footer()).on('keyup change', function () {
          if (that.search() !== this['value']) {
            that
              .search(this['value'])
              .draw();
          }
        });
      });
    });
  }

  ngOnInit() {

    //this.empleadoService.getEmpleados().subscribe(empleados => this.empleados = empleados);
      this.empleadoService.getEmpleados().subscribe(
      empleados => {
        this.empleados = empleados;
        this.dtTrigger.next();
      }
      //Lo mismo de arriba
      /*function (empleados) {
         this.empleados = empleados;
       }*/
    );
    
    console.log(this.empleados);
  }

  eliminarEmpleado(empleado: Empleado): void {
    Swal({
      title: 'Estas seguro?',
      text: '¿Está seguro de que desea eliminar el empleado?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!'
    }).then((result) => {
      if (result.value) {
        this.empleadoService.deletedEmpleado(empleado.id).subscribe(
          response => {
            this.empleados = this.empleados.filter(empl => empl !== empleado)
            Swal(
              'Eliminado!',
              'Your imaginary file has been deleted.',
              'success'
            )
          }
        )

        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }


  abrirModal(empleado: Empleado) {
    this.empleadoSeleccionado = empleado;
    this.modalService.abrirModal();
  }


  toggleOn(primerNombre: string) {
    console.log(primerNombre);
    for (let row of this.empleados) {

      if (row.primerNombre == primerNombre) {
        row.toggle = 1;
      }
    }
  }

  toggleOff(primerNombre: string) {
    console.log(primerNombre);

    for (let row of this.empleados) {

      if (row.primerNombre == primerNombre) {
        row.toggle = 0;
      }
    }
  }


}
