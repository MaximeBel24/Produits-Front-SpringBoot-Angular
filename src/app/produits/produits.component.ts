import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../produit.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  produits! : Produit[];

  constructor(private produitService: ProduitService) {
    // this.produits = produitService.listeProduits();
  }

  ngOnInit(): void {
    this.chargerProduits();
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

}
