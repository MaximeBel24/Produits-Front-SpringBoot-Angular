import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from '../produit.service';
import { Categorie } from '../model/categorie.model';

@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html',
  styles: []
})
export class UpdateProduitComponent implements OnInit {

  currentProduit = new Produit();
  categories! : Categorie[];
  updatedCatId! : number;

  constructor(
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private produitService : ProduitService
  ) { }

  updateProduit() {
    this.currentProduit.categorie = this.categories.
     find(cat => cat.idCat == this.updatedCatId)!;
    this.produitService.updateProduit(this.currentProduit).subscribe(prod => {
    this.router.navigate(['produits']); }
    );
  }

  ngOnInit(): void {
    this.produitService.listeCategories().
    subscribe(cats => {this.categories = cats;
    console.log(cats);
    });
    this.produitService.consulterProduit(this.activatedRoute.snapshot.params['id']).
    subscribe( prod =>{ this.currentProduit = prod; 
    this.updatedCatId = this.currentProduit.categorie.idCat;
    } ) ;
  }

}
