import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-regra',
  templateUrl: './cadastro-regra.component.html',
  styleUrls: ['./cadastro-regra.component.css']
})
export class CadastroRegraComponent implements OnInit {
  
  gridTitle: string = "Cadastro de Regras eDAT";
    
  object: any = {};
  
  constructor() { }

  ngOnInit() {
  }
  
  public updateObjectParameter(object: any):void {
	this.object = object;
    console.log('Updating parameter... ', this.object);
  }


}
