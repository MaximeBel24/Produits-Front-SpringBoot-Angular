import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from '../produit.service';

@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html',
  styles: []
})
export class UpdateProduitComponent implements OnInit {

  currentProduit = new Produit();

  constructor(
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private produitService : ProduitService
  ) { }

  updateProduit() {
    this.produitService.updateProduit(this.currentProduit);
    this.router.navigate(['produits']);
  }

  ngOnInit(): void {
    this.currentProduit = this.produitService.consulterProduit(this.activatedRoute.snapshot.params['id']);
    console.log(this.currentProduit);
  }

}
