import { Component, OnInit } from '@angular/core';
import { ConsultadatService } from './services/consultadat.service';
import { URLSearchParams } from '@angular/http';
import { PopupControllerComponent } from '../../shared/popup-controller/popup-controller.component';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'

declare var $:any; // JQUERY

@Component({
  selector: 'app-consulta-dat',
  templateUrl: './consulta-dat.component.html',
  styleUrls: ['./consulta-dat.component.css']
})

export class ConsultaDatComponent implements OnInit {
  dadosConsulta: any;
  captchaUsuario: string;
  captchaLetras: string = "";
  captchaURLImg: string = "";
  captchaBaseUrl: string = "http://ec2-52-67-135-39.sa-east-1.compute.amazonaws.com:8080/wsedat";

  constructor(private parentRouter: Router, private datService: ConsultadatService,
    private popupController: PopupControllerComponent) { }

  ngOnInit() {
    this.dadosConsulta = {
      "codigoConfirmacao":"",
      "cpf":"",
      "cnh":""
    };
    this.captchaUsuario = "";
    this.resetCPFMask();
    this.carregarCaptcha();
  }

  resetCPFMask() {
	   setTimeout(function() {
		     $('#cpf').unmask().mask('000.000.000-00', {reverse: true});
         $('.cnh').unmask().mask('00000000000');
	   }, 500);
  }

  cancelar(){
    var me = this;

     $( "#alertDialogText" ).dialog({
       title:"Alerta",
       modal: true,
       dialogClass: "no-close",
       buttons: [
         {
           text: "Sim",
           click: function() {
             me.parentRouter.navigate(['']);
             $( this ).dialog( "close" );
           }
         },
         {
           text: "Não",
           click: function() {
             $( this ).dialog( "close" );
           }
         }
       ]
     }).text("Tem certeza que deseja cancelar?");
  }

  verificaCaptcha() {
    if(this.captchaLetras != this.captchaUsuario) {
      this.popupController.showPopupMessage("Atenção!", "Código de validação incorreto.", true);
      return false;
    }
    return true;
  }

  consultar(){
    if(!this.validaDadosObrigatorios() || !this.verificaCaptcha()) {
      return;
    }

	this.consultarDat();
  }

  validaDadosObrigatorios () {
	  let camposObrigatorios = $( ".form-group" ).not(".nao-obrigatorio");
	  camposObrigatorios.removeClass('has-error');

	  let camposNaoPreenchidos = camposObrigatorios.find('input, select').filter(function() { return $(this).val() == ""; });
	  if (camposNaoPreenchidos.length > 0) {
      camposNaoPreenchidos.parent().addClass('has-error');
      this.popupController.showPopupMessage("Atenção!", "Favor preencher todos os campos obrigatórios.", true);
      return false;
	  }

	  return true;
  }

  carregarCaptcha(){
    this.popupController.showPopupMessage("Aguarde!", "Carregando captcha.", false);

    this.datService.recarregarCaptcha()
                      .subscribe(
                          result => {
                            this.captchaLetras = result["letras"];
                            this.captchaURLImg = this.captchaBaseUrl + result["urlImage"];

                            this.popupController.hidePopupMessage();
                          }, //Bind to view
                          err => {
                            this.popupController.showPopupMessage("Atenção!", "Não foi possível carregar o captcha. Tente novamente.", true);
                            console.log(err);
                          });
  }

  consultarDat() {
     var me = this;

     let params: URLSearchParams = new URLSearchParams();
	   this.dadosConsulta.cpf = this.dadosConsulta.cpf.replace(/\D/g,'');
     params = this.dadosConsulta;
     this.popupController.showPopupMessage("Aguarde!", "Carregando DAT.", false);

    // Salva dado
    this.datService.consultaDat(params)
                      .subscribe(
                          result => {
                            this.popupController.hidePopupMessage();
                            window.open("http://ec2-52-67-135-39.sa-east-1.compute.amazonaws.com:8080/wsedat"+result);
                          }, //Bind to view
                          err => {
                            this.popupController.showPopupMessage("Atenção!", "Não foi possível carregar os dados. Tente novamente.", true);
                            console.log(err);
                          });
  }
}
