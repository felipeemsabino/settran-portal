import { Component, OnInit } from '@angular/core';
import { EDATService } from '../../../shared/services/e-dat.service';
import { ConfirmacaodatService } from './services/confirmacaodat.service';
import { URLSearchParams } from '@angular/http';
import { PopupControllerComponent } from '../../../shared/popup-controller/popup-controller.component';

declare var $:any; // JQUERY

@Component({
  selector: 'app-confirmacao-dat',
  templateUrl: './confirmacao-dat.component.html',
  styleUrls: ['./confirmacao-dat.component.css'],
  providers: [ConfirmacaodatService]
})
export class ConfirmacaoDatComponent implements OnInit {
  mostrarCampoCelular: boolean = false;

  constructor(public edatService: EDATService, private confirmacaoedatService: ConfirmacaodatService,
    private popupController: PopupControllerComponent) { }

  ngOnInit() {
    this.edatService.eDAT.emailEnviaConfirmacao = this.edatService.eDAT.emailMunicipe;

   if(!this.edatService.eDAT.enviouSms) {
     this.edatService.eDAT.enviouSms = 'N';
   }
   this.resetMasks();
  }

  resetMasks() {
  	setTimeout(function() {

  		$('.phone').mask('(00) 00000-0000');

  	}, 500);
  }
  setReceberSMS(){
    this.resetMasks();
  	if(this.edatService.eDAT.enviouSms == 'S') {
  		this.edatService.eDAT.enviouSms = 'N';
      this.mostrarCampoCelular = false;
  	} else if(this.edatService.eDAT.enviouSms == 'N') {
  		this.edatService.eDAT.enviouSms = 'S';
      this.mostrarCampoCelular = true;
      this.edatService.eDAT.numeroEnvioSms = this.edatService.eDAT.celular;
  	}
  }

  enviarNovoCodigo() {
    this.enviarCodigo(true);
  }

  enviarCodigo(reenviar: boolean){
    let params: URLSearchParams = new URLSearchParams();

  	if(this.edatService.eDAT.emailEnviaConfirmacao == "") {
      this.popupController.showPopupMessage("Atenção!", 'Por favor, preencha o campo de email para recebimento da eDAT.', true);
  	  return;
  	}

  	if(this.edatService.eDAT.enviouSms == "S" && this.edatService.eDAT.numeroEnvioSms.length == 0) {
      this.popupController.showPopupMessage("Atenção!", 'Por favor, preencha o campo de telefone.', true);
  	  return;
  	}

    let mensagem: string = reenviar ? "Reenviando confirmação." : "Enviando confirmação.";
    this.popupController.showPopupMessage("Atenção!", mensagem, false);

  	let dados: any = {
  		"emailMunicipe":this.edatService.eDAT.emailEnviaConfirmacao,
  		"nomeMunicipe":this.edatService.eDAT.nomeMunicipe
  	};

  	params = dados;

  	console.log(params);
    // Salva dado
    this.confirmacaoedatService.enviarCodigo(params).subscribe(
                          result => {
                            this.popupController.showPopupMessage("Atenção!", 'Confirmação enviada com sucesso. Por favor, verifique seu email/celular.', true);
                          }, //Bind to view
                          err => {
                            this.popupController.showPopupMessage("Atenção!",
                            'Ocorreram erros ao enviar confirmação. Por favor, tente novamente.', true);
                              console.log(err);
                          });
  }

  confirmarCodigo(){
  	let params: URLSearchParams = new URLSearchParams();

  	if(this.edatService.eDAT.codigoConfirmacaoDat == "") {
      this.popupController.showPopupMessage("Atenção!", 'Por favor, preencha o campo de código.', true);
  	  return;
  	}

    this.popupController.showPopupMessage("Atenção!", 'Confirmando código.', false);
    params.set("codigoConfirmacao", this.edatService.eDAT.codigoConfirmacaoDat);

    // Salva dado
    this.confirmacaoedatService.confirmarCodigo(params).subscribe(
                          result => {

              							if(result){
                              this.popupController.showPopupMessage("Atenção!",
                              'Código confirmado com sucesso.', true);
            							    this.edatService.codigoVerificado = 'S';
              							} else {
                              this.popupController.showPopupMessage("Atenção!",
                              'Código de confirmação inválido.', true);
              							    this.edatService.codigoVerificado = 'N';
              							}
                          }, //Bind to view
                          err => {
                            this.popupController.showPopupMessage("Atenção!",
                            'Ocorreram erros ao validar o código de confirmação! Por favor, confira o código e tente novamente.', true);
                            console.log(err);
			                      this.edatService.codigoVerificado = 'N';
                          });
  }
}
