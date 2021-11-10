import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../authentification.service';
import { PanierService } from '../panier.service';
import { ProduitsService } from '../produits.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public user : Observable<string>;
  private produits: Object[] = new Array();

  constructor(private authService: AuthentificationService,private router : Router,private panierService : PanierService, private produitService : ProduitsService) {
    this.user = this.authService.getUser();
   }

  ngOnInit(): void {
    if(this.authService.getUserEmail() != ""){
      this.router.navigate(['/produits']);// afficher les categories dès la fin du chargement de la page.

    }else{
      this.router.navigate(['/categories']);// afficher les categories dès la fin du chargement de la page.

    }
  }
  deconnexion(){
    this.authService.disconnect();
    this.router.navigate(['/categories']);// retourner aux categories après la deconnexion.
  }
  paniers(){
    this.router.navigate(['/panier']); // afficher  l. 
  }
  panier(){
    this.router.navigate(['/panier/'+this.user]); // afficher  le panier du user. 
  }
 
  recherche(indice : string){
    this.produitService.getRecherche(indice);
  }

}
