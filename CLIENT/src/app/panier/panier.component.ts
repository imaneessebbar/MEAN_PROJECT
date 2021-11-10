import { HttpClient  , HttpHeaders} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../authentification.service';
import { PanierService } from '../panier.service';



@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})

export class PanierComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private user: Observable<string>;
  private email : string = "";
  private paniers: Object[] = new Array();
  private id = "";
  //private panier: Object;
  private price = 0;
  
  constructor(private router: Router, private authService: AuthentificationService, private panierService: PanierService) {
    this.user = this.authService.getUser();
    this.email = this.authService.getUserEmail();
  }
  
  ngOnInit(): void {      
      this.panierService.getPanier(this.email).subscribe(paniers => {
        this.paniers = paniers;
        this.id = paniers[0]._id;
        let x = paniers[0].produit;// faudra enlever le [0] apres avoir passer le params user !!
        let i = 0;
        for (const product of x) {
          this.price = this.price + product.prix*paniers[0].quantite[i];
          i++;
        }
    });
  }
  incQuantite(index : any):void{
    // ajt une fct dans service pour ajouter une quantité et l'apeler ici
    this.panierService.ajtQuantité(this.email , index).subscribe(data => {
      let msgaj = "qnt AJOUTE";
      console.log(msgaj);
    });
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/panier/'+this.email]);
    
  });
  }
  decQuantite(index : any):void{
    // ajt une fct dans service pour enlever une quantité et l'apeler ici
    this.panierService.retQuantité(this.email , index).subscribe(data => {
      let msgaj = "qnt retirée";
      console.log(msgaj);
      
    });
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/panier/'+this.email]);
  });
    
  }
  supprimer(index : any):void{
    // ajt une fct pour retirer un produit
    this.panierService.retirerProduit(this.email , index).subscribe(data => {
      let msgaj = "PRODUIT AJOUTE";
      console.log(msgaj);
    });
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/panier/'+this.email]);
  });
  }
  valider(){
    this.panierService.viderPanier(this.email).subscribe(data => {
      let msgaj = "panier vidé";
      console.log(msgaj);
    });
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/panier/'+this.email]);
  });
}

}