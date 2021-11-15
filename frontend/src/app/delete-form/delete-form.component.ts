import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-form',
  templateUrl: './delete-form.component.html',
  styleUrls: ['./delete-form.component.css']
})
export class DeleteFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(myForm: any) {
    const username = myForm.value.firstname;
    const pass = myForm.value.pass;  
  
      fetch('http://localhost:3000/users',{
          method: 'DELETE',
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
  