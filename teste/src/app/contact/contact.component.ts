import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  feedbackForm : FormGroup;
  feedback : Feedback;
  contactType = ContactType;
  @ViewChild('fform') feedbackFormDirective;

  constructor(private fb : FormBuilder) { 
    this.createForm();
  }

  ngOnInit() {
  }

  formErrors = {
    'firstname' : '',
    'lastname' : '',
    'telnum' : '',
    'email' : '' 
   }

   validationMessages = {
    'firstname' : {
      'required':'First name is required',
      'minlength':'First name must be at least 2 characteres',
      'maxlength':'First name cannot be more then 25 characteres'
    },
    'lastname':{
      'required':'Last name is required',
      'minlength':'Last name must be at least 2 characteres',
      'maxlength':'Last name cannot be more then 25 characteres'
    },
    'telnum':{
      'required':'Tel. Number is required',
      'pattern':'Tel. number must contain just numbers'
    },
    'email':{
      'required':'Email is required',
      'email':'Email must be valid'
    }
   }

  createForm() : void{
    this.feedbackForm = this.fb.group({ //formGroup = FormBuilder.group
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: [0, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contactType: 'None',
      message: ''

    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

      this.onValueChanged(); // (re)set validation messages now
  }

  
  

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }

        }
      }
    }
  }

  onSubmit(){
    this.feedback = this.feedbackForm.value; //Feedback = FormGroup.value
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contactType: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm();
  }
}
