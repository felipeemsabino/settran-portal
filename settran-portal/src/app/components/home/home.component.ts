import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router }   from '@angular/router';
import { LoginService } from './services/login.service';
import { URLSearchParams } from '@angular/http';
import { PopupControllerComponent } from '../shared/popup-controller/popup-controller.component';

declare var $:any; // JQUERY

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[LoginService]
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
              private loginService: LoginService,
              private popupController: PopupControllerComponent) { }

  ngOnInit() {
    $(document).ready(function() {
      $('.equal-height-panels .panel').matchHeight();
      $.fn.matchHeight.update();
    });
  	setTimeout(function() {
  	  $('.cpf').unmask().mask('000.000.000-00', {reverse: true});
  	}, 500);
  }

	registerCredentials: any = {usuario: '', senha: ''};
  esqueciSenha: any = {cpf:''};

  validaCamposEsqueciSenha() {
    if(this.esqueciSenha.cpf.length == 0 ) {
      this.popupController.showPopupMessage("Aguarde!", "Por favor, insira seu CPF para prosseguir com a recuperação da senha.", true);
      return false;
    }
    return true;
  }

  validaCamposLogin() {
    if(this.registerCredentials.usuario.length == 0 || this.registerCredentials.senha.length == 0) {
      this.popupController.showPopupMessage("Aguarde!", "Por favor, preencha os campos de usuário e senha.", true);
      return false;
    }
    return true;
  }

  recuperarSenha() {
    if(!this.validaCamposEsqueciSenha()){
      return false;
    }
    let params: URLSearchParams = new URLSearchParams();

    this.popupController.showPopupMessage("Aguarde!", "Recuperando sua senha.", false);
    params = this.registerCredentials;
    // Salva dado
    this.loginService.recuperarSenha(params)
                      .subscribe(
                          result => {
                            console.log(result);
                            this.popupController.showPopupMessage("Aguarde!", "Sua senha foi recuperada com sucesso, verifique seu e-mail cadastrado para maiores informações.", true);

                          }, //Bind to view
                          err => {
                            this.popupController.showPopupMessage("Atenção!",
                            "Ocorreram erros ao recuperar sua senha! Por favor, tente novamente.", true);                              console.log(err);
                          });
  }

  entrar () {
    if(this.registerCredentials.usuario === 'agente' && this.registerCredentials.senha === 'agente') {
      this.router.navigate(['/area-agente']);
    } else if(this.registerCredentials.usuario === 'admin' && this.registerCredentials.senha === 'admin') {
      this.router.navigate(['/area-admin']);
    }

    if(!this.validaCamposLogin()){
      return false;
    }
    let params: URLSearchParams = new URLSearchParams();

    this.popupController.showPopupMessage("Aguarde!", "Realizando login.", false);
    params = this.registerCredentials;
    // Salva dado
    this.loginService.realizaLogin(params)
                      .subscribe(
                          result => {
                            console.log(result);
                          }, //Bind to view
                          err => {
                            this.popupController.showPopupMessage("Atenção!",
                            "Ocorreram erros ao realizar o login! Por favor, tente novamente.", true);                              console.log(err);
                          });
  }
}
