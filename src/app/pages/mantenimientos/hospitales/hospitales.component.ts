import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../../services/hospital.service';
import { environment } from '../../../../environments/environment.prod';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BusquedaService } from '../../../services/busqueda.service';

const base_url = environment.base_url;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public totalHospitales = 0;
  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  public hospitalesTemp: Hospital[] = [];
  public imgSubs: Subscription;
  public desde = 0;


  // tslint:disable-next-line: max-line-length
  constructor(private hospitalService: HospitalService, private modalImagenService: ModalImagenService, private busquedasService: BusquedaService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospital();
    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen.pipe(delay(150))
      .subscribe(resp => this.cargarHospital());
  }

  // tslint:disable-next-line: typedef
  buscar(termino: string) {
    if (termino.length === 0) {
      this.cargarHospital();
    }

    this.busquedasService.buscar('hospitales', termino).subscribe((resp: Hospital[]) => {
      this.hospitales = resp;
    });
  }

  // tslint:disable-next-line: typedef
  cargarHospital() {
    this.cargando = true;
    this.hospitalService.cargarHospitales(this.desde)
      .subscribe(({ total, hospitales }) => {
        this.totalHospitales = total;
        this.hospitales = hospitales;
        this.cargando = false;
      });
  }

  // tslint:disable-next-line: typedef
  cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalHospitales) {
      this.desde -= valor;
    }
    this.cargarHospital();
  }

  // tslint:disable-next-line: typedef
  guadarCambios(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre).subscribe(resp => {
      Swal.fire('Actualizado', hospital.nombre, 'success');
    });
  }

  // tslint:disable-next-line: typedef
  eliminarHospital(hospital: Hospital) {
    Swal.fire({
      title: `Esta seguro de eliminar ${hospital.nombre} ?`,
      text: 'Esto no es reversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.borrarHospital(hospital._id).subscribe(resp => {
          this.cargarHospital();
          this.cambiarPagina(this.desde = 0);
          Swal.fire('Borrado', hospital.nombre, 'success');

        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  // tslint:disable-next-line: typedef
  async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del Hospital',
      showCancelButton: true,
    });
    if (value.trim().length > 0) {
      return this.hospitalService.crearHospital(value).subscribe((resp: any) => {
        const { nombre } = resp.hospital;
        this.cargarHospital();
        Swal.fire('Exito', `${nombre} se agrego correctamente`, 'success');
      });
    }
  }
  // tslint:disable-next-line: typedef
  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img)
  }
}
