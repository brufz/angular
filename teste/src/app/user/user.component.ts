import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../shared/user';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userForm : FormGroup;
  user : User;
 

  @ViewChild('fform') feedbackFormDirective;

  constructor(private fb : FormBuilder) { 
    this.createForm();
  }

  ngOnInit() {
    
  }

  
  createForm() : void{
    this.userForm = this.fb.group({
      'rating': 0,
      'comment':'',
      'author': ''
    })
  }

  onSubmit(){
    this.user = this.userForm.value;
    console.log(this.user);
    this.userForm.reset({
      'rating':0,
      'comment':'',
      'author':''
    })
    this.feedbackFormDirective.resetForm();
  }
         
//   <div [formGroup]="myGroup">
//   <input formControlName="firstName">
// </div>

// In your class:

// this.myGroup = new FormGroup({
//    firstName: new FormControl()
// });



  

}
