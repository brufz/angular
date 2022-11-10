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

  formErrors = {
    'comment':'',
    'author':''
  }

  validationMessagesErrors = {
    'comment':{
      'required':'A comment is required'
    },
    'author':{
      'required':'Your name is required',
      'minlength':'Your name must be at least 2 characteres long'
    }
  }

  createForm() : void{
    this.userForm = this.fb.group({
      'rating': 0,
      'comment':['', Validators.required],
      'author': ['',[Validators.required, Validators.minLength(2)]]
    })

    this.userForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

      this.onValueChanged(); // (re)set validation messages now
  }
         
  onValueChanged(data?: any){
    if(!this.userForm){ return ;}
    const form = this.userForm;
    for (const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        this.formErrors[field] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages = this.validationMessagesErrors[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

}
