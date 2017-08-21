import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-cadastro-faq',
  templateUrl: './cadastro-faq.component.html',
  styleUrls: ['./cadastro-faq.component.css']
})
export class CadastroFaqComponent implements OnInit {

  gridTitle: string = "Cadastro de Perguntas Frequentes";

  object: any = {};

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.userIsLogged();
  }

  public updateObjectParameter(object: any):void {
	this.object = object;
    console.log('Updating parameter... ', this.object);
  }

}
