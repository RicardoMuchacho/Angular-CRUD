import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent {


onSubmit(myForm: any) {
  const username = myForm.value.firstname;
  const pass = myForm.value.pass;  

    fetch('http://localhost:3000/login',{
        method: 'POST',
        headers: new Headers({
      // Encabezados
     'Content-Type': 'application/json'
      }),
        body: JSON.stringify(
      {

      "username": username,
      "pass": pass
      })
      
    }).then(response=>{
      console.log(response);
      return response.json()
    }).then(r =>{
      console.log(r);
  }).catch(e => console.log(e))
    
  myForm.resetForm();
}


  
}
