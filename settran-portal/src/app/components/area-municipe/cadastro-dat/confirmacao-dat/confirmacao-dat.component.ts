import { Component, OnInit } from '@angular/core';
import { EDATService } from '../../../shared/services/e-dat.service';
import { ConfirmacaodatService } from './services/confirmacaodat.service';
import { URLSearchParams } from '@angular/http';

declare var $:any; // JQUERY

@Component({
  selector: 'app-confirmacao-dat',
  templateUrl: './confirmacao-dat.component.html',
  styleUrls: ['./confirmacao-dat.component.css'],
  providers: [ConfirmacaodatService]
})
export class ConfirmacaoDatComponent implements OnInit {

  constructor(public edatService: EDATService, private confirmacaoedatService: ConfirmacaodatService) { }

  ngOnInit() {
   if(!this.edatService.eDAT.enviouSms) {
     this.edatService.eDAT.enviouSms = 'N';
   }
  }

  setReceberSMS(){
	if(this.edatService.eDAT.enviouSms == 'S') {
		this.edatService.eDAT.enviouSms = 'N';
	} else if(this.edatService.eDAT.enviouSms == 'N') {
		this.edatService.eDAT.enviouSms = 'S';
	}
  }
  
  enviarCodigo(){
    let params: URLSearchParams = new URLSearchParams();
	
	if(this.edatService.eDAT.emailEnviaConfirmacao == "") {
	  alert('Favor preencher o campo de email para recebimento da eDAT.');
	  return;
	}
	
	if(this.edatService.eDAT.enviouSms == "S") {
	  alert('Favor preencher o campo de telefone para recebimento da eDAT.');
	  return;
	}
	
	$('#loadingModal').modal('show'); // abre loadingModal
	let dados: any = {
		"emailMunicipe":this.edatService.eDAT.emailEnviaConfirmacao,
		"nomeMunicipe":this.edatService.eDAT.nomeMunicipe
	};
	
	params = dados;
	
	console.log(params);
    // Salva dado
    this.confirmacaoedatService.enviarCodigo(params)
                      .subscribe(
                          result => {
							$('#loadingModal').modal('hide'); // fecha loadingModal
							alert('Código de confirmação enviado com sucesso!');
                          }, //Bind to view
                          err => {
                            alert('Ocorreram erros ao enviar o código de confirmação! Por favor, confira os dados e tente novamente!');
							$('#loadingModal').modal('hide'); // fecha loadingModal
                            console.log(err);
                          });
  }
  
  confirmarCodigo(){
	let params: URLSearchParams = new URLSearchParams();
	
	if(this.edatService.eDAT.codigoConfirmacaoDat == "") {
	  alert('Favor preencher o campo de código.');
	  return;
	}	
	
	$('#loadingModal').modal('show'); // abre loadingModal
    params.set("codigoConfirmacao", this.edatService.eDAT.codigoConfirmacaoDat);

    // Salva dado
    this.confirmacaoedatService.confirmarCodigo(params)
                      .subscribe(
                          result => {
							$('#loadingModal').modal('hide'); // fecha loadingModal
							
							if(result){
								alert('Código de confirmação confirmado com sucesso!');
							    this.edatService.codigoVerificado = 'S';
							} else {
								alert('Código de confirmação inválido!');
							    this.edatService.codigoVerificado = 'N';
							}
                          }, //Bind to view
                          err => {
                            alert('Ocorreram erros ao validar o código de confirmação! Por favor, confira o código e tente novamente!');
							$('#loadingModal').modal('hide'); // fecha loadingModal
                            console.log(err);
							this.edatService.codigoVerificado = 'N';
                          });
  }
}
