import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ProduitsService } from '../produits.service';
import { Observable } from 'rxjs';
import { PanierService } from '../panier.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

    private user: Observable<string>;
    private produits: Object[] = new Array();
    private email : string = ""; 
    constructor(private route: ActivatedRoute, private authService: AuthentificationService, private produitsService: ProduitsService , private panierService : PanierService) {
      this.user = this.authService.getUser();
      this.email = this.authService.getUserEmail();

    }
    
    ngOnInit() {
      this.route.params.subscribe((params :Params) => {
          console.log("Invocation du composant produits avec "+params["categorie"]);
          if (params["categorie"] !== undefined) {
              console.log("/produits/"+params['categorie']);
              this.produitsService.getProduitsParCategories(params["categorie"]).subscribe(produits => {
                  this.produits = produits;
	      });                     
          }
          else {
             this.produitsService.getProduits().subscribe(produits => {
                  this.produits = produits;
	     });
	  }
      });
    }
    ajout(produit : any){
      console.log("hello from ajout() de produit componnent"+this.email+produit);
      this.panierService.putProduits(this.email,produit).subscribe(data => {
        let msgaj = "PRODUIT AJOUTE";
        console.log(msgaj);
      });
    }
}