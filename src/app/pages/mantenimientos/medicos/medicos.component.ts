import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedaService } from '../../../services/busqueda.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {
  public cargando: boolean = true;
  public medicos: Medico[] = [];
  public desde = 0;
  public imgSubs: Subscription;
  public totalMedicos = 0;
  // tslint:disable-next-line: max-line-length
  constructor(private medicoService: MedicoService, private modalImagenService: ModalImagenService, private busquedaService: BusquedaService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen.pipe(delay(150))
      .subscribe(resp => this.cargarMedicos());
  }

  // tslint:disable-next-line: typedef
  buscar(termino: string) {
    if (termino.length === 0) {
      this.cargarMedicos();
    }

    this.busquedaService.buscar('medicos', termino).subscribe((resp: Medico[]) => {
      this.medicos = resp;
    });
  }

  // tslint:disable-next-line: typedef
  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos(this.desde)
      .subscribe(({ total, medicos }) => {
        this.cargando = false;
        this.totalMedicos = total;
        this.medicos = medicos;

      });
  }

  // tslint:disable-next-line: typedef
  cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalMedicos) {
      this.desde -= valor;
    }
    this.cargarMedicos();
  }
  // tslint:disable-next-line: typedef
  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

  borrarMedico(medico: Medico) {
    Swal.fire({
      title: 'Borrar usuario?',
      text: `Esta a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.borrarMedico(medico._id).subscribe(resp => {

          Swal.fire(
            'Eliminado!',
            `${medico.nombre} a sido borrado del registro.`,
            'success'
          );
          this.cambiarPagina(this.desde = 0);
          this.cargarMedicos();
        });
      }
    });
  }

}
