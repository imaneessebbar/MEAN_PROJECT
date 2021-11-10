import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProduitsComponent } from './produits/produits.component'
import { CategoriesComponent } from './categories/categories.component'
import { PanierComponent } from './panier/panier.component'
import { ConnexionComponent } from './connexion/connexion.component';

const routes: Routes = [
  {
    path : 'produits',
    component : ProduitsComponent
  },
  {
    path : 'categories',
    component : CategoriesComponent
  },
  {
    path: 'produits/:categorie',
    component: ProduitsComponent
  },
  {
    path: 'RefreshComponent',
    component: PanierComponent
  },
  {
    path: 'panier/:user',
    component: PanierComponent
  },
  {
    path: 'panier',
    component: PanierComponent
  },
  {
    path: 'membres/connexion',
    component: ConnexionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
