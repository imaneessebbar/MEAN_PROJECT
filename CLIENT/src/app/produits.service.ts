import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  private urlBase : string = "http://localhost:8888/";
  constructor(private http : HttpClient) { }
  
  getProduits(): Observable<any>{
  	return this.http.get(this.urlBase+'produits');
  }
  getCategories():Observable<any> {
    return this.http.get(this.urlBase+'categories/');
  }
  getProduitsParCategories(categorie : string):Observable<any> {
    return this.http.get(this.urlBase+'produits/'+categorie);
  }
  getRecherche(indice : string): Observable<any> {
   
    return this.http.get(this.urlBase+'produits/'+indice); // still don't know how to do but gonna do it 
  }
  
}
