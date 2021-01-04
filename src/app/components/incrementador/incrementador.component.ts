import { Component, Input, Output, EventEmitter, OnInit  } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  // tslint:disable-next-line: no-inferrable-types
// tslint:disable-next-line: no-input-rename
 @Input('valor') progreso: number = 40;
 @Input() btnClass: string = ' btn-primary';
 // tslint:disable-next-line: no-output-rename
 @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter();
  
 ngOnInit(): void {
   this.btnClass = `btn ${this.btnClass}`;
  }


// tslint:disable-next-line: typedef
cambiarValor(valor: number){

  if (this.progreso >= 100 && valor >= 0) {
    this.valorSalida.emit(100);
    return this.progreso = 100;
  }

  if (this.progreso <= 0 && valor < 0) {
    this.valorSalida.emit(0);
    return this.progreso = 0;
  }
  this.progreso = this.progreso + valor;
  this.valorSalida.emit(this.progreso);
}

onChange(nuevoValor: number){

  if (nuevoValor >= 100) {
    this.progreso = 100;
  }else if(nuevoValor <= 0){
  this.progreso = 0;
  }else{
    this.progreso = nuevoValor;
  }

  this.valorSalida.emit(this.progreso);

}

}
