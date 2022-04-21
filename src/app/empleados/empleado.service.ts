import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { Empleado } from './Empleado';
import { Observable } from 'rxjs';
import { of, throwError } from 'rxjs';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators'
import swal from 'sweetalert2';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private urlEndPoint: string = 'http://localhost:8080/api/empleados/listar';
  private urlForm: string = 'http://localhost:8080/api/empleados/crear ';
  private urlBuscar: string = 'http://localhost:8080/api/empleados';
  private urlEliminar: string = 'http://localhost:8080/api/empleados/eliminar2';

  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' })

  constructor(private http: HttpClient, private router: Router) { }

  getEmpleados(): Observable<Empleado[]> {
    //return of(EMPLEADOS);
    /*
        return this.http.get<Empleado[]>(this.urlEndPoint).pipe(
          catchError(e => {
            this.router.navigate(['empleados']);
            swal('Error al listar', e.error.error, 'error');
            return throwError(e);
          })
        );*/

    return this.http.get(this.urlEndPoint).pipe(
      map((response) => {
        let empleados23 = response as Empleado[];

        console.log("Empleados:", empleados23);
        console.log(typeof empleados23);
        //console.log("Empleados json", EMPLEADOS);
        //console.log(typeof EMPLEADOS);

        return empleados23['empleados'].map(empleado => {
          /*empleado.nombres = empleado.nombres.toUpperCase();
          empleado.apellidos = empleado.apellidos.toUpperCase();*/
          empleado.primerNombre = empleado.primerNombre.toUpperCase();
          empleado.otrosNombres = empleado.otrosNombres.toUpperCase();
          empleado.primerApellido = empleado.primerApellido.toUpperCase();
          empleado.segundoApellido = empleado.segundoApellido.toUpperCase();
          if (empleado.enabled == true) {
            empleado.enabled = "Activo";
          }
          empleado.fecha_ingreso = formatDate(empleado.fecha_ingreso, 'dd/MM/yyyy HH:mm:ss', 'en-US');
          empleado.createAt = formatDate(empleado.createAt, 'dd/MM/yyyy HH:mm:ss', 'en-US');
          return empleado;
        });
      })
    );
  }

  create(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.urlForm, empleado, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        this.router.navigate(['empleados/form']);
        swal('Error al guardar', e.error.error, 'error');
        return throwError(e);
      })
    )
  }

  getEmpleado(id): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.urlBuscar}/${id}`).pipe(map((response) => {
      let empleados2 = response as Empleado;


      empleados2.primerNombre = empleados2.primerNombre.toUpperCase();
      empleados2.otrosNombres = empleados2.otrosNombres.toUpperCase();
      empleados2.primerApellido = empleados2.primerApellido.toUpperCase();
      empleados2.segundoApellido = empleados2.segundoApellido.toUpperCase();

     
      empleados2.fecha_ingreso = formatDate(empleados2.fecha_ingreso, 'yyyy-MM-dd', 'en-US');
      empleados2.createAt = formatDate(empleados2.createAt, 'yyyy-MM-dd', 'en-US');
      console.log(empleados2);
      return empleados2;

    }),
      catchError(e => {

        this.router.navigate(['empleados']);
        swal('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

  updateEmpleado(empleado: Empleado): Observable<Empleado> {

    return this.http.put<Empleado>
      (`${this.urlBuscar}/${empleado.id}`, empleado, { headers: this.httpHeaders }).pipe(
        map((response) => {
          let empleados2 = response as Empleado;


          empleados2.primerNombre = empleado.primerNombre.toUpperCase();
          empleados2.otrosNombres = empleado.otrosNombres.toUpperCase();
          empleados2.primerApellido = empleado.primerApellido.toUpperCase();
          empleados2.segundoApellido = empleado.segundoApellido.toUpperCase();
   

          empleados2.fecha_ingreso = formatDate(empleado.fecha_ingreso, 'yyyy-MM-dd', 'en-US');
          empleados2.createAt = formatDate(empleado.createAt, 'yyyy-MM-dd', 'en-US');
          console.log(empleado);
          return empleados2;

        }),

        catchError(e => {
          this.router.navigate(['empleados/form', empleado.id]);
          swal('Error al actualizar', e.error.error, 'error');
          return throwError(e);
        })
      )

  }

  deletedEmpleado(id): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.urlEliminar}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        this.router.navigate(['empleados']);
        swal('Error al eliminar', e.error.error, 'error');
        return throwError(e);
      })
    )
  }


  subirFoto(archivo: File, id): Observable<Empleado> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);
    return this.http.post(`${this.urlBuscar}/upload`, formData).pipe(

      map((response: any) => response.empleado as Empleado),
      catchError(e => {

        if (e.status == 400) {
          return throwError(e);
        }

        //this.router.navigate(['empleados']);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })

    );

  }

}
