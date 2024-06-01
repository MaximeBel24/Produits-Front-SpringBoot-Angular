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
    this.newProduit.categorie = this.categories.find(cat => cat.idCat == this.newIdCat)!;
    this.produitService.ajouterProduit(this.newProduit)
    .subscribe(prod => {
      console.log(prod);
      this.router.navigate(['produits']);
    });
  }

  ngOnInit(): void {
    this.produitService.listeCategories()
    .subscribe(cats => {this.categories = cats._embedded.categories})
  }

}
