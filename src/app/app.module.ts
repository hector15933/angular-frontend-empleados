import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { RouterModule, Routes } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './empleados/form.component';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DetalleComponent } from './empleados/detalle/detalle.component';
import { LoginComponent } from './usuarios/login.component';
import { HeaderComponent } from './header/header.component';

import { EmpleadoService } from './empleados/empleado.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { DataTablesModule } from "angular-datatables";


const routes: Routes = [
  { path: '', redirectTo: '/empleados', pathMatch: 'full' },
  { path: 'empleados', component: EmpleadosComponent },
  { path: 'empleados/form', component: FormComponent },
  { path: 'empleados/form/:id', component: FormComponent },
  { path: 'empleados/eliminar2/:id', component: EmpleadosComponent },
  { path: 'empleados/ver/:id', component: DetalleComponent },
  { path: 'login', component: LoginComponent },
  { path: 'header', component: HeaderComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    EmpleadosComponent,
    FormComponent,
    DetalleComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    DataTablesModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule, MatDatepickerModule, MatNativeDateModule
  ],
  providers: [EmpleadoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
