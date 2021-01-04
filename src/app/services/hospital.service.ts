import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/operators';
import { Hospital } from '../models/hospital.model';
import { CargarHospital } from '../interfaces/cargar-hospitales.interface';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {


  constructor(private http: HttpClient, private router: Router) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  // tslint:disable-next-line: typedef
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  // tslint:disable-next-line: typedef
  cargarHospitales(desde: number = 0) {
    const url = `${base_url}/hospitales?desde=${desde}`;
    return this.http.get<CargarHospital>(url, this.headers)
      .pipe(
        map(resp => {
          const hospitales = resp.hospitales.map(
            hosp => new Hospital(hosp.nombre, hosp._id, hosp.img, hosp.usuario)
          );
          return {
            total: resp.total,
            hospitales
          }
        })
      );
  }
  // tslint:disable-next-line: typedef
  crearHospital(nombre: string) {
    const url = `${base_url}/hospitales`;

    return this.http.post(url, { nombre }, this.headers);
  }

  // tslint:disable-next-line: typedef
  actualizarHospital(_id: string, nombre: string,) {
    const url = `${base_url}/hospitales/${_id}`;

    return this.http.put(url, { nombre }, this.headers);
  }
  // tslint:disable-next-line: typedef
  borrarHospital(_id: string) {
    const url = `${base_url}/hospitales/${_id}`;

    return this.http.delete(url, this.headers);
  }
}
