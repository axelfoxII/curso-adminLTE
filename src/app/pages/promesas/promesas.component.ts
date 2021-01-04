import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuarios().then(usuarios =>{
      console.log(usuarios);
    });
    // const promesa = new Promise((resolve, reject) =>{
    //   if (false) {
    //     resolve('hola mundoo');
    //  }else{
    //    reject('Algo salio mal');
    //  }
    // });
    // promesa.then((mensaje) =>{
    //   console.log(mensaje);
    // })
    // .catch(error =>  console.log('Error en la promesa', error))
    // console.log('Fin del Init');
  }
 // tslint:disable-next-line: typedef
 getUsuarios(){
   return new Promise(resolve =>{
     fetch('https://reqres.in/api/users?page=2')
           .then(resp => resp.json())
           .then(body => console.log(body.data));
          });
   }

}
