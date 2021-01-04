import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy  {

  public intervalSubs: Subscription;
  constructor() {
      // this.retornaObservable().pipe(retry(2)).subscribe(
      // valor => console.log('Subs:', valor),
      // err => console.warn('error', err),
      // () => console.info('Obs terminado')
      // );
      this.intervalSubs = this.retornaIntervalo().subscribe( console.log);
   }
  ngOnDestroy(): void {
   this.intervalSubs.unsubscribe();
  }

   // tslint:disable-next-line: typedef
   retornaIntervalo(): Observable<number>{
     return interval(200)
                                   .pipe(
                                     map( valor =>   valor + 1 ),
                                     filter(valor =>(valor % 2 === 0) ? true : false),
                                     take(10)
                                   );
   }

   // tslint:disable-next-line: typedef
   retornaObservable(): Observable<number>{
       let i = -1;
       return new Observable<number>(observer => {
      const intervalo = setInterval(() => {
         i++;
         observer.next(i);
         if (i === 4) {
           clearInterval(intervalo);
           observer.complete();
         }
      }, 1000);
    });
   }

}
