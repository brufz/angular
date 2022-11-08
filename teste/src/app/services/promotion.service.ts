import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  getPromotions() : Promise<Promotion[]>{
    return new Promise(resolve => {
      setTimeout((resolve) => {
        PROMOTIONS
      }), 2000
    })
  }


  // getPromotions() : Promise<Promotion[]> {
  //   return Promise.resolve(PROMOTIONS);
  // }


  getPromotion(id : number) : Promise<Promotion>{
    return new Promise (resolve => {
      setTimeout((resolve) => {
        PROMOTIONS.filter((prom) => (prom.id === id))[0]
      }), 2000
    })
  }


  // getPromotion(id : number) : Promise<Promotion>{
  //   return Promise.resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0])
  // }

  getFeaturedPromotion() : Promise<Promotion>{
    return new Promise((resolve) => {
      setTimeout(() => resolve (PROMOTIONS.filter((prom) => prom.featured)[0]),2000)
    })
  }

  // getFeaturedPromotion() : Promise<Promotion>{
  //   return Promise.resolve(PROMOTIONS.filter((promo) => promo.featured)[0]);
  // }

  constructor() { }
}
