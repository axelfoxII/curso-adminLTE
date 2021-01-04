import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { CargarMedico } from '../interfaces/cargar-medicos.interface';
import { Medico } from '../models/medico.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http: HttpClient) { }

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
  cargarMedicos(desde: number = 0) {
    const url = `${base_url}/medicos?desde=${desde}`;
    return this.http.get<CargarMedico>(url, this.headers)
      .pipe(
        map((resp: { total: number, medicos: Medico[] }) => {
          return {
            medicos: resp.medicos,
            total: resp.total
          };
        })
      );
  }
  obtenerMedicoById(id: string) {
    const url = `${base_url}/medicos/${id}`;
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, medico: Medico }) => resp.medico)
      );
  }
  // tslint:disable-next-line: typedef
  crearMedico(medico: { nombre: string, hospital: string }) {
    const url = `${base_url}/medicos`;

    return this.http.post(url, medico, this.headers);
  }
  // tslint:disable-next-line: typedef
  actualizarMedico(medico: Medico) {
    const url = `${base_url}/medicos/${medico._id}`;

    return this.http.put(url, medico, this.headers);
  }
  // tslint:disable-next-line: typedef
  borrarMedico(_id: string) {
    const url = `${base_url}/medicos/${_id}`;

    return this.http.delete(url, this.headers);
  }

}
