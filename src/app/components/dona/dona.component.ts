import { Component, Input } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {

  @Input() title: string = 'Sin titulo';
  // tslint:disable-next-line: no-input-rename
  @Input('labels') doughnutChartLabels: Label[] = ['label1', 'label2', 'label2'];
  // tslint:disable-next-line: no-input-rename
  @Input('data') doughnutChartData: MultiDataSet = [
    [350, 450, 100],
    ];
 public colors: Color[] = [
    { backgroundColor: ['#2C75B3', '#8AC1E8', '#F30E39'] }
  ];

}
