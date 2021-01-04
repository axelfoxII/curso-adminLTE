import { Component, EventEmitter, OnInit } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir: File;
  public imgTemp: any = null;
  public imgName: any = null;

  constructor(public modalImagenService: ModalImagenService, public fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
    this.imgName = null;
    this.imagenSubir = null;
  }

  // tslint:disable-next-line: typedef
  cambiarImagen(file: File) {
    this.imagenSubir = file;
    if (!file) {
      return this.imgTemp = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
      this.imgName = file.name;
    };
  }
  // tslint:disable-next-line: typedef
  subirImagen() {
    const { id, tipo, img } = this.modalImagenService;
    this.fileUploadService.actualizarfoto(this.imagenSubir, tipo, id)
      // tslint:disable-next-line: no-shadowed-variable
      .then(img => {
        Swal.fire('GUARDADO', 'Imagen guardada correctamente', 'success');
        this.modalImagenService.nuevaImagen.emit(img);
        this.cerrarModal();
      }).catch(err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error')
      });
  }



}
