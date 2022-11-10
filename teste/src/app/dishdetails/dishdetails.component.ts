import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Dish } from '../shared/dish';

import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { User } from '../shared/user';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dishdetails',
  templateUrl: './dishdetails.component.html',
  styleUrls: ['./dishdetails.component.css']
})

export class DishdetailsComponent implements OnInit {

  userForm : FormGroup;
  user : User;
  @ViewChild('fform') feedbackFormDirective;

  dish : Dish;
  dishIds : number[];
  prev : number;
  next : number;
  
  constructor(private dishService : DishService,
              private route: ActivatedRoute,
              private location : Location,
              private fb : FormBuilder) {
                
                this.createForm();

               }

  ngOnInit() {
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(Number(params['id']))))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }

  // goBack(){
  //   this.location.back();
  // }

  setPrevNext(dishId: number) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
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

  onSubmit(){
    this.user = this.userForm.value;
    console.log(this.user);
    this.userForm.reset({
      'rating':0,
      'comment':'',
      'author':'',
      'date':''
    })
    this.feedbackFormDirective.resetForm();
  }

  createForm() : void{
    this.userForm = this.fb.group({
      'rating': 0,
      'comment':['', Validators.required],
      'author': ['',[Validators.required, Validators.minLength(2)]],
      'date' : new Date()
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
