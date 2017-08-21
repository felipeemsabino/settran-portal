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
   if(!this.edatService.eDAT.enviouSms) {
     this.edatService.eDAT.enviouSms = 'N';
   }
  }

  setReceberSMS(){
  	if(this.edatService.eDAT.enviouSms == 'S') {
  		this.edatService.eDAT.enviouSms = 'N';
      this.mostrarCampoCelular = false;
  	} else if(this.edatService.eDAT.enviouSms == 'N') {
  		this.edatService.eDAT.enviouSms = 'S';
      this.mostrarCampoCelular = true;
  	}
  }

  enviarCodigo(){
    let params: URLSearchParams = new URLSearchParams();

  	if(this.edatService.eDAT.emailEnviaConfirmacao == "") {
      this.popupController.showPopupMessage("Atenção!", 'Por favor, preencha o campo de email para recebimento da eDAT.', true);
  	  return;
  	}

  	if(this.edatService.eDAT.enviouSms == "S" && this.edatService.eDAT.numeroEnvioSms.length == 0) {
      this.popupController.showPopupMessage("Atenção!", 'Por favor, preencha o campo de telefone.', true);
  	  return;
  	}

    this.popupController.showPopupMessage("Atenção!", 'Enviando confirmação.', false);

  	let dados: any = {
  		"emailMunicipe":this.edatService.eDAT.emailEnviaConfirmacao,
  		"nomeMunicipe":this.edatService.eDAT.nomeMunicipe
  	};

  	params = dados;

  	console.log(params);
    // Salva dado
    this.confirmacaoedatService.enviarCodigo(params).subscribe(
                          result => {
                            this.popupController.showPopupMessage("Atenção!", 'Confirmação enviada com sucesso.', true);
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
