import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../shared/dish';

import { DISHES } from '../shared/dishes';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dishdetails',
  templateUrl: './dishdetails.component.html',
  styleUrls: ['./dishdetails.component.css']
})
export class DishdetailsComponent implements OnInit {

  dish : Dish

  constructor(private dishService : DishService,
              private route: ActivatedRoute,
              private location : Location) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.dishService.getDish(id).then((dish) => this.dish = dish);
  }

  goBack(){
    this.location.back();
  }

}
