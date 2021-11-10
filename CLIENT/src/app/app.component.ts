import { Component } from '@angular/core';
import { Input, Directive, ViewContainerRef,  NgModule, TemplateRef } from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'


@Directive({
    selector: '[ngVar]',
})
export class VarDirective {
  @Input()
  set ngVar(context: any) {
    this.context.$implicit = this.context.ngVar = context;
    this.updateView();
  }
  
  context: any = {};
    
  constructor(private vcRef: ViewContainerRef, private templateRef: TemplateRef<any>) {}
    
  updateView() {
    this.vcRef.clear();
    this.vcRef.createEmbeddedView(this.templateRef, this.context);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SuperVentes';
}
