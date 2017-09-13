import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-cadastro-regra',
  templateUrl: './cadastro-regra.component.html',
  styleUrls: ['./cadastro-regra.component.css']
})
export class CadastroRegraComponent implements OnInit {

  gridTitle: string = "Cadastro de Regras DAT";

  object: any = {};

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.userService.userIsLogged();
  }

  public updateObjectParameter(object: any):void {
	this.object = object;
  }


}
