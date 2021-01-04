import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from 'src/app/models/medico.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];
  public medicoSeleccionado: Medico;
  public hospitalSeleccionado: Hospital;

  // tslint:disable-next-line: max-line-length
  constructor(private fb: FormBuilder, private hospitalService: HospitalService, private medicoService: MedicoService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.cargarMedico(id));
    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],
    });
    this.cargarHospitales();
    this.medicoForm.get('hospital').valueChanges.subscribe(hospitalId => {
      this.hospitalSeleccionado = this.hospitales.find(h => h._id === hospitalId);

    });
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales().subscribe(({ total, hospitales }) => {
      this.hospitales = hospitales;
    })
  }

  cargarMedico(id: string) {
    if (id === 'nuevo') {
      return;
    }
    this.medicoService.obtenerMedicoById(id).pipe(delay(100))
      .subscribe(medico => {
        if (!medico) {
          return this.router.navigateByUrl(`/dashboard/medicos`);
        }
        const { nombre, hospital: { _id } } = medico;
        this.medicoSeleccionado = medico;
        this.medicoForm.setValue({ nombre, hospital: _id });
      })
  }

  guardarMedico() {
    const { nombre } = this.medicoForm.value;
    if (this.medicoSeleccionado) {
      // actualizar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      this.medicoService.actualizarMedico(data).subscribe(resp => {
        console.log(resp);
        Swal.fire('Actualizado', `${nombre} se actualizo correctamente`, 'success');
      });
      this.router.navigateByUrl(`/dashboard/medicos`);
    } else {
      // crear
      // tslint:disable-next-line: no-shadowed-variable
      const { nombre } = this.medicoForm.value;
      this.medicoService.crearMedico(this.medicoForm.value).subscribe((resp: any) => {
        console.log((resp));
        Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
      });
    }
  }

}
