import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router }   from '@angular/router';
import { LoginService } from './services/login.service';
import { URLSearchParams } from '@angular/http';
import { PopupControllerComponent } from '../shared/popup-controller/popup-controller.component';
import { UserService } from '../shared/services/user.service';

declare var $:any; // JQUERY

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[LoginService]
})
export class HomeComponent implements OnInit {

  userIp: string;

  constructor(private router: Router,
              private loginService: LoginService,
              private userService: UserService,
              private popupController: PopupControllerComponent) { }

  ngOnInit() {
    $(document).ready(function() {
      $('.equal-height-panels .panel').matchHeight();
      $.fn.matchHeight.update();
    });
  	setTimeout(function() {
  	  $('.cpf').unmask().mask('000.000.000-00', {reverse: true});
  	}, 500);

    this.getUserIp();
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

    params.set("cpf",this.esqueciSenha.cpf.replace(/[^0-9]/g,''));
    params.set("ip", this.userIp);
    // Salva dado
    this.loginService.recuperarSenha(params)
                      .subscribe(
                          result => {
                            if(result.status == 404) {
                              this.popupController.showPopupMessage("Atenção!",
                              result.json(), true);
                            } else {
                              this.esqueciSenha.cpf = "";
                              this.popupController.showPopupMessage("Aguarde!", "Sua senha foi recuperada com sucesso, verifique seu e-mail cadastrado para maiores informações.", true);
                            }

                          }, //Bind to view
                          err => {
                            this.popupController.showPopupMessage("Atenção!",
                            "Ocorreram erros ao recuperar sua senha! Por favor, tente novamente.", true);
                            this.esqueciSenha.cpf = "";
                                                          console.log(err);
                          });
  }

  entrar () {
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
                            if(result.status == 404) {
                              this.popupController.showPopupMessage("Atenção!",
                              result.json(), true);
                              //"Usuário ou senha inválidos! Por favor, tente novamente.", true);
                            } else {
                              this.popupController.hidePopupMessage();
                              this.userService.registerLogin(result);
                              this.redirecionarUsuario(result);
                            }
                          }, //Bind to view
                          err => {
                            this.popupController.showPopupMessage("Atenção!",
                            "Ocorreram erros ao realizar o login! Por favor, tente novamente.", true);                              console.log(err);
                          });
  }

  redirecionarUsuario(userData: any) {
      if(this.userService.userIsLogged() == false) {
        return false;
      }

      if(userData.adm == 'N') {
        this.router.navigate(['/area-agente']);
      } else if(userData.adm == 'S') {
        this.router.navigate(['/area-admin']);
      }
  }

  getUserIp(){
    //this.userIp = "192.168.2.2";

    let self = this;
    $.getJSON('//freegeoip.net/json/?callback=?', function(data) {
      self.userIp = data.ip;
    });
  }
}
