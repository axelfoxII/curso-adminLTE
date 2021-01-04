import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { BusquedaService } from '../../../services/busqueda.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import Swal from 'sweetalert2';
import { catchError, delay } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public totalUsuarios = 0;
  public usuarios: Usuario[] = [];
  public imgSubs: Subscription;
  public usuariosTemp: Usuario[] = [];
  public desde = 0;
  public cargando = true;
  constructor(private usuariosService: UsuarioService,
    private busquedasService: BusquedaService,
    private modalImagenService: ModalImagenService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuario();
    this.imgSubs = this.modalImagenService.nuevaImagen.pipe(delay(150))
      .subscribe(resp => this.cargarUsuario());
  }

  // tslint:disable-next-line: typedef
  cargarUsuario() {
    this.cargando = true;
    this.usuariosService.cargarUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      });
  }

  // tslint:disable-next-line: typedef
  cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }
    this.cargarUsuario();
  }

  // tslint:disable-next-line: typedef
  buscar(termino: string) {

    if (termino.trim().length === 0) {
      return this.usuarios = this.usuariosTemp;
    }
    this.busquedasService.buscar('usuarios', termino.trim()).subscribe((resultados: Usuario[]) => {
      this.usuarios = resultados;
    }),
      catchError(error => of(false))
  }
  // tslint:disable-next-line: typedef
  eliminarUsuario(usuario: Usuario) {

    if (usuario.uid === this.usuariosService.uid) {
      return Swal.fire('ERROR', 'No puede borrarse asi mismo', 'error');
    }
    Swal.fire({
      title: 'Borrar usuario?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.eliminaUsuario(usuario).subscribe(resp => {

          Swal.fire(
            'Eliminado!',
            `${usuario.nombre} a sido borrado del registro.`,
            'success'
          );
          this.cambiarPagina(this.desde = 0);
          this.cargarUsuario();
        });
      }
    });
  }

  // tslint:disable-next-line: typedef
  cambiarRole(usuario: Usuario) {
    this.usuariosService.guardarUsuario(usuario).subscribe(resp => {
    });

  }
  // tslint:disable-next-line: typedef
  abrirModal(usuario: Usuario) {
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }

}
