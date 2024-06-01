import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { Categorie } from '../model/categorie.model';
import { ProduitService } from '../produit.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styles: [
  ]
})
export class RechercheParNomComponent implements OnInit {

  nomProduit! : string;
  allProduits! : Produit[];
  searchTerm! : string;

  produits! : Produit[];
  IdCategorie! : number;
  categories! : Categorie[];

  constructor(private produitService: ProduitService) { }

  ngOnInit(): void {
    this.produitService.listeCategories().subscribe(cats => {
      this.categories = cats._embedded.categories;
    })
    this.produitService.listeProduits().subscribe(prods => {
      console.log(prods);
      this.allProduits = prods;
      });
      
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

  rechercherProds(){
    this.produitService.rechercherParNom(this.nomProduit).subscribe(prods => {
      this.produits = prods; 
      console.log(prods)
    });
  }

  onKeyUp(filterText: string){
    this.produits = this.allProduits.filter(item => item.nomProduit.toLowerCase().includes(filterText));
  }

}
