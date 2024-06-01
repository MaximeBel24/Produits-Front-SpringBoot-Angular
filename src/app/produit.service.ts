import { Injectable } from '@angular/core';
import { Produit } from './model/produit.model';
import { Categorie } from './model/categorie.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategorieWrapper } from './model/categorie-wrapper.model';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type' : 'application/json'} )
};

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  apiUrl: string = 'http://localhost:8080/produits/api';
  apiURLCat: string = 'http://localhost:8080/produits/cat';

  produits! : Produit[];
  produit! : Produit;
  categories! : Categorie[];

  constructor(private http : HttpClient) {

  }

  listeProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiUrl);
  }

  ajouterProduit( prod: Produit):Observable<Produit>{
    return this.http.post<Produit>(this.apiUrl, prod, httpOptions);
  }

  supprimerProduit(id: number)
  {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  consulterProduit(id:number): Observable<Produit>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Produit>(url);    
  }

  trierProduits() {
    this.produits = this.produits.sort((n1,n2) => {
      if (n1.idProduit! > n2.idProduit!) {
        return 1;
      }
      if (n1.idProduit! < n2.idProduit!) {
        return -1;
      }

      return 0;
    });
  }

  updateProduit(prod :Produit) {
    return this.http.put<Produit>(this.apiUrl, prod, httpOptions);
  }

  listeCategories():Observable<CategorieWrapper> {
    return this.http.get<CategorieWrapper>(this.apiURLCat);
  }

  consulterCategorie(id:number): Categorie{
    return this.categories.find(cat => cat.idCat == id)!;
  }

  rechercherParCategorie(idCat: number):Observable<Produit[]> {
    const url = `${this.apiUrl}/prodscat/${idCat}`;
    return this.http.get<Produit[]>(url);
  }

  rechercherParNom(nom: string):Observable< Produit[]> {
    const url = `${this.apiUrl}/prodsByName/${nom}`;
    return this.http.get<Produit[]>(url);
  }

  ajouterCategorie( cat: Categorie):Observable<Categorie>{
    return this.http.post<Categorie>(this.apiURLCat, cat, httpOptions);
  }
    
}
