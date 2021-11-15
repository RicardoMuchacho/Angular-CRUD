import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(myForm: any) {
    const firstname = myForm.value.firstname;
    const secondname = myForm.value.secondname;
    const username = myForm.value.firstname;
    const pass = myForm.value.pass;
    const cpass = myForm.value.pass;
    const nfirstname = myForm.value.nfirstname;
    const npass = myForm.value.npass;


    fetch('http://localhost:3000/users',{
      method: 'PUT',
      headers: new Headers({
    // Encabezados
   'Content-Type': 'application/json'
    }),
      body: JSON.stringify(
    {
      "firstname": nfirstname,
      "secondname": nfirstname,
      "username": firstname,
      "pass": npass,
      "cpass": npass
    })
    
  }).then(response=>{
    return response.json()
  }).then(r =>{
    console.log(r);
}).catch(e => console.log(e))
    
}
}
