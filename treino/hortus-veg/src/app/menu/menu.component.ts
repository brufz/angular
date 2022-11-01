import { Component, OnInit } from '@angular/core';

import { Pratos } from '../shared/pratos';

const PRATOS : Pratos[] = [
  {
    id : 0,
    nome : "Moqueca de banana",
    descricao : "Moqueca vegana feita com banana-da-terra e azeite de dendê",
    preco : "28,00",
    imagem: '/assets/images/uthappizza.png'
  },
  {
    id : 1,
    nome : "Bobó de palmito",
    descricao : "Feito com palmito da melhor qualidade e temperos fresquinhos",
    preco : "25,00",
    imagem: '/assets/images/zucchipakoda.png'
  },
  {
    id : 2,
    nome : "Strogonoff de proteína de soja",
    descricao : "Feito com creme de leite vegano e soja da melhor qualidade, super bem temperada",
    preco : "25,00",
    imagem: '/assets/images/vadonut.png'
  },
  {
 
  id : 3,
  nome : "Caldo de mandioquinha",
  descricao : "Ideal para dias frios, acompanha torradinhas",
  preco : "15,00",
  imagem: '/assets/images/elaicheesecake.png'
  
  }
]

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})


export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  pratos = PRATOS

  }
