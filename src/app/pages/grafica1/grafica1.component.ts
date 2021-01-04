import { Component, Input } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {
 // tslint:disable-next-line: no-input-rename
 @Input('labels') labels1: string[] =  ['Pan', 'Refresco', 'Jugos'];
  public data1 = [
    [10, 20, 50],
    ];
}
