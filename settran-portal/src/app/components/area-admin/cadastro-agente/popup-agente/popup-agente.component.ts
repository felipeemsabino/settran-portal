import { Component, OnInit, Input } from '@angular/core';
import { AgenteService } from '../services/agente.service';
import { URLSearchParams } from '@angular/http';
import { PopupControllerComponent } from '../../../shared/popup-controller/popup-controller.component';

declare var $:any; // JQUERY

@Component({
  selector: 'app-popup-agente',
  templateUrl: './popup-agente.component.html',
  styleUrls: ['./popup-agente.component.css'],
  providers: [AgenteService]
})
export class PopupAgenteComponent implements OnInit {

  entity: any;
  confirmacaoSenha: string;

  @Input('object')
  set object(value: any) {
  	this.entity = Object.assign({}, value);
  	if(!this.entity.ativo) {
  		this.entity.ativo = 'S';
  		this.entity.adm = 'S';
  	}
  	this.resetMasks();
    this.confirmacaoSenha = "";
  }

  constructor(private agenteService: AgenteService, private popupController: PopupControllerComponent) {
  }

  ngOnInit() {
    this.setCPFMask();
  }

  setCPFMask () {
	   $('.cpf').mask('000.000.000-00', {reverse: true});
  }

  resetMasks() {
  	setTimeout(function() {
  	  $('.cpf').unmask().mask('000.000.000-00', {reverse: true});
  	}, 500);
  }

  validaSenhas() {
    if(this.entity.senha != $('#confirmacaoSenha').val()) {
  		return false;
  	}
  	return true;
  }

  onSubmit() {
    let params: URLSearchParams = new URLSearchParams();
    this.entity.cpfAgente = this.entity.cpfAgente.replace(/\D/g,'');

    if(!this.validaCampos()){
      return false;
    }

      this.popupController.showPopupMessage("Aguarde!", "Salvando registros...", false);
      params = this.entity;
      // Salva dado
      this.agenteService.saveData(params)
                        .subscribe(
                            result => {
                              if(result.status == 400) {
                                this.popupController.showPopupMessage("Atenção!", result.json(), true);
                              } else {
                                this.popupController.showPopupMessage("Atenção!",
                                "Registro gravado com sucesso.", true);

                                $('#loadingModal').on('hidden.bs.modal', function () {
                                  $('#agenteModal').modal('hide');
                                  $('#recarregaGrid').click();
                                  $('#loadingModal').unbind('hidden');
                                });
                              }
                            }, //Bind to view
                            err => {
                              this.popupController.showPopupMessage("Atenção!",
                              "Ocorreram erros ao salvar o registro! Por favor, tente novamente.", true);                              console.log(err);
                            });
  }

  validaCPF() {
    var strCPF = this.entity.cpfAgente;
    var retorno = true;
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") retorno = false;

    for (var i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) retorno = false;

    Soma = 0;
    for (var i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) retorno = false;

    if(retorno == false) {
      this.popupController.showPopupMessage("Atenção!", "O CPF informado não é válido.", true);
    }
    return retorno;
  }

  validaEmail() {

  	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  	if(!$('.email').val().match(re)) {
      this.popupController.showPopupMessage("Atenção!", "O email informado não é válido.", true);
  		return false;
  	}
  	return true;
  }

  validaSenha() {
    if(!this.validaSenhas()) {
      this.popupController.showPopupMessage("Atenção!", "As senhas não conferem.", true);
      return false;
    }
    return true;
  }

  validaCampos(){
    if(!this.validaCPF() || !this.validaSenha() || !this.validaEmail())
      return false;

      return true;
  }

  deleteData () {}

  setAtivo() {
    if(this.entity.ativo == 'S')
  		this.entity.ativo = 'N';
  	if(this.entity.ativo == 'N')
  		this.entity.ativo = 'S';
  }

  alteraAdm(adm: string) {
    this.entity.adm = adm;
  }
}
