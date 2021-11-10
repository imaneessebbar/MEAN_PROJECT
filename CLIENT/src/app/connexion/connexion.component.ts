import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { PanierService } from '../panier.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {

  private utilisateur = {"email":"", "password":""};
  private message: string = "";
  private newuser = {
    "nom" : "",
    "prénom" : "",
    "email" : "",
    "password" : ""
  };
  private paniervide = {
    "user":"",
    "produit":[],
    "quantite":[]
  }
  private paniers = {
    "_id":"",
    "produit":[],
    "quantite":[]
  }
  
  constructor(private authService: AuthentificationService, private router: Router,private panierService : PanierService) { }

  onSubmit() {
    this.authService.verificationConnexion(this.utilisateur).subscribe(reponse => {
      this.message = reponse['message'];
      //this.message = "hello world!";
      if (reponse['resultat']) {
        this.authService.connect(this.utilisateur.email);
        this.panierService.getPanier(this.utilisateur.email).subscribe(paniers => {
          this.paniers = paniers[0];
          this.paniers._id = paniers[0]._id;      
          this.paniers.produit = paniers[0].produit;
          this.paniers.quantite = paniers[0].quantite;
          this.getPanierUser();
        });
	      this.router.navigate(['/produits']);
      }
      //setTimeout( () => { this.router.navigate(['/categories']); }, 1000 );
    });
  }
  newUser():void{
    this.authService.newU(this.newuser).subscribe(reponse => {
      this.message = reponse['message'];
      this.paniervide.user = this.newuser.email;
      this.panierService.panierVide(this.paniervide).subscribe(reponse => {
        this.message = "Compte Creé!";});

    });      
    //this.router.navigate(['/produits']);

      
    }
   
    getPanierUser(){
      this.panierService.Lepanier(this.paniers._id,this.paniers.produit,this.paniers.quantite);
      console.log("getPanierUser : "+this.paniers._id+" " +this.paniers.produit+" "+this.paniers.quantite);
    }




}