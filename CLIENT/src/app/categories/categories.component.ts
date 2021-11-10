import { Component, OnInit } from '@angular/core';
import { ProduitsService} from '../produits.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

      public cat : any;
        constructor(private ps : ProduitsService) { }
        ngOnInit(): void {
        	this.ps.getCategories().subscribe( cat => { 
        		this.cat = cat;
        	});
        }

}
