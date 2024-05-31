import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../produit.service';
import { Categorie } from '../model/categorie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-produits',
  templateUrl: './add-produits.component.html',
  styleUrls: ['./add-produits.component.css']
})
export class AddProduitsComponent implements OnInit {

  newProduit = new Produit();
  categories! : Categorie[];

  newIdCat! : number;
  newCategorie! : Categorie;

  constructor(
    private produitService: ProduitService,
    private router : Router
  ) {}

  addProduit() {
    // console.log(this.newProduit);
    this.newCategorie = this.produitService.consulterCategorie(this.newIdCat);
    this.newProduit.categorie = this.newCategorie;
    this.produitService.ajouterProduit(this.newProduit);
    this.router.navigate(['produits']);
  }

  ngOnInit(): void {
    this.categories = this.produitService.listeCategories();
  }

}
