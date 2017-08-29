import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-cadastro-agente',
  templateUrl: './cadastro-agente.component.html',
  styleUrls: ['./cadastro-agente.component.css']
})
export class CadastroAgenteComponent implements OnInit {

  gridTitle: string = "Cadastro de Agentes";

  object: any = {};

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.userService.userIsLogged();
  }

  public updateObjectParameter(object: any):void {
	this.object = object;
    console.log('Updating parameter... ', this.object);
  }

}
