import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../produit.service';
import { Categorie } from '../model/categorie.model';

@Component({
  selector: 'app-recherche-par-categorie',
  templateUrl: './recherche-par-categorie.component.html',
  styles: [
  ]
})
export class RechercheParCategorieComponent implements OnInit {

  produits! : Produit[];
  IdCategorie! : number;
  categories! : Categorie[];

  constructor(private produitService: ProduitService) { }

  ngOnInit(): void {
    this.produitService.listeCategories().subscribe(cats => {
      this.categories = cats._embedded.categories;
    })
  }

  chargerProduits(){
    this.produitService.listeProduits().subscribe(prods => {
      this.produits = prods
    })
  }

  supprimerProduit(p: Produit)
  {
    let conf = confirm("Etes-vous sûr ?")
    if (conf) {
      this.produitService.supprimerProduit(p.idProduit).subscribe(() => {
        this.chargerProduits();
      });
    }   
  }

  onChange() {
    this.produitService.rechercherParCategorie(this.IdCategorie).subscribe(prods =>{this.produits=prods});
  }

}
