import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(myForm: any) {
    const firstname = myForm.value.firstname;
    const secondname = myForm.value.secondname;
    const username = myForm.value.firstname;
    const pass = myForm.value.pass;
    const cpass = myForm.value.pass;
    
      fetch('http://localhost:3000/register',{
          method: 'POST',
          headers: new Headers({
        // Encabezados
        'Content-Type': 'application/json'
        }),
          body: JSON.stringify(
        {
        "firstname": firstname,
        "secondname": secondname,
        "username": username,
        "pass": pass,
        "cpass": cpass
        })
        
      }).then(response=>{
        console.log(response);
        if (response.redirected == true)
        {
          window.location.replace(response.url)
        }
        return response.json()
      }).then(r =>{
        console.log(r);
    }).catch(e => console.log(e))
    
    myForm.resetForm();
}
}
