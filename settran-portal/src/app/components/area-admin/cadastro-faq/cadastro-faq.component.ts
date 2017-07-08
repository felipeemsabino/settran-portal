import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-faq',
  templateUrl: './cadastro-faq.component.html',
  styleUrls: ['./cadastro-faq.component.css']
})
export class CadastroFaqComponent implements OnInit {

  gridTitle: string = "Cadastro de Perguntas Frequentes";
    
  object: any = {};
  
  constructor() { }

  ngOnInit() {
  }
  
  public updateObjectParameter(object: any):void {
	this.object = object;
    console.log('Updating parameter... ', this.object);
  }

}
