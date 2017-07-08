import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cadastro-agente',
  templateUrl: './cadastro-agente.component.html',
  styleUrls: ['./cadastro-agente.component.css']
})
export class CadastroAgenteComponent implements OnInit {

  object: any = {};
  gridTitle: string = "Cadastro de Agentes";
  
  constructor() { 
  }

  ngOnInit() {
  }
  
  public updateObjectParameter(object: any):void {
	this.object = object;
    console.log('Updating parameter... ', this.object);
  }

}
