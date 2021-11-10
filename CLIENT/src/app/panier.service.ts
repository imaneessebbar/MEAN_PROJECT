import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { newArray } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Observable , Subject} from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE",	  
    "Access-Control-Allow-Headers": "Content-type",  
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  })
};

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private baseURL : string = "http://localhost:8888/";
  private paniers: Object[] = new Array();
  private produits: any = new Array();
  private quantite: any = new Array();
  private _id : string = "";
  private _refreshComponent$ = new Subject<void>();

  constructor(private http : HttpClient ) { }
  
  getPanier(user : string): Observable<any>{
    return this.http.get(this.baseURL+'panier/'+user);
  }
  getRefresh(){
    return this._refreshComponent$;
  }
  getPaniers() : Observable<any>{
  	return this.http.get(this.baseURL+'panier');
  }
  retirerProduit(email : string ,index : any): Observable<any> {
        this.produits.splice(index,1);
        this.quantite.splice(index,1);
      return this.http.put(this.baseURL+'panier/add/'+email,{"_id":this._id,"user":email,"produit":this.produits,"quantite":this.quantite});
  }
  ajtQuantité(email : string , index : any) : Observable<any> {
    this.quantite[index]++;
    return this.http.put(this.baseURL+'panier/add/'+email,{"_id":this._id,"user":email,"produit":this.produits,"quantite":this.quantite});
  }
  retQuantité(email : string , index : any) : Observable<any> {
    this.quantite[index]--;
    if(this.quantite[index]==0){
      this.produits.splice(index,1);
      this.quantite.splice(index,1);
    }
    return this.http.put(this.baseURL+'panier/add/'+email,{"_id":this._id,"user":email,"produit":this.produits,"quantite":this.quantite});
  }
  panierVide(newuser : any ):Observable<any>{//user contien email produit[] et quantité[]
    return this.http.post(this.baseURL+'panier/new', newuser , httpOptions);
  }
  putProduits(email : string , produit : any): Observable<any> {
    let pr = {
      "nom" : produit.nom,
      "type" : produit.type,
      "prix" : produit.prix,
      "marque" : produit.marque
    }
    let i = -1;
    let j = 0;
    for(const x of this.produits){
      if(x.nom == pr.nom){
        i = j;
      }
      console.log("NOM PRODUIT : " +x.nom);
      console.log("NOM PR : " +pr.nom);
      console.log("coucou from checkProduit :: ELSE :: this.produits: "+ x);
    }
      if(i==-1){
        this.produits.push(pr);
        this.quantite.push(1);
      }else{
        this.quantite[i]++;
        
        console.log("coucou from checkProduit :: ELSE :: this.produits: "+this.produits);
        console.log("coucou from checkProduit  :: ELSE :: this.quantite: "+this.quantite);
      }
      return this.http.put(this.baseURL+'panier/add/'+email,{"_id":this._id,"user":email,"produit":this.produits,"quantite":this.quantite});
  }
 
  
  viderPanier(email : string  ){
    return this.http.put(this.baseURL+'panier/vider',{"_id":this._id,"user":email,"produit":[],"quantite":[]});
  }

  Lepanier(id : any , produit : any , quantite : any){
    this._id = id;      
    this.produits = produit;
    this.quantite = quantite;
    console.log("Lepanier : "+this._id+"||"+this.produits+" || "+this.quantite);
  }
}
