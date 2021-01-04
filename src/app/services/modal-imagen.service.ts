import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  // tslint:disable-next-line: variable-name
  private _ocultarModal: boolean = true;
  public tipo: 'usuarios' | 'medicos' | 'hospitales';
  public id: string;
  public img: string;
  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();


  // tslint:disable-next-line: typedef
  get ocultarModal() {
    return this._ocultarModal;
  }

  // tslint:disable-next-line: typedef
  abrirModal(tipo: 'usuarios' | 'medicos' | 'hospitales', id: string, img: string = 'noimage') {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;

    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${base_url}/upload/${tipo}/${img}`;
    }

  }
  // tslint:disable-next-line: typedef
  cerrarModal() {
    this._ocultarModal = true;
  }
  constructor() { }
}

