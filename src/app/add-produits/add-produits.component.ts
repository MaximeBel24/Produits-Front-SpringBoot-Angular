import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../produit.service';

@Component({
  selector: 'app-add-produits',
  templateUrl: './add-produits.component.html',
  styleUrls: ['./add-produits.component.css']
})
export class AddProduitsComponent implements OnInit {

  newProduit = new Produit();

  constructor(private produitService: ProduitService) {}

  addProduit() {
    // console.log(this.newProduit);
    this.produitService.ajouterProduit(this.newProduit);
  }

  ngOnInit(): void {
  }

}
