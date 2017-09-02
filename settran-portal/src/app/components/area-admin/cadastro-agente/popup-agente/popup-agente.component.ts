import { Component, OnInit, Input } from '@angular/core';
import { AgenteService } from '../services/agente.service';
import { URLSearchParams } from '@angular/http';
import { PopupControllerComponent } from '../../../shared/popup-controller/popup-controller.component';
import { Validator } from '../../../shared/utils/validator';

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
  ativo: string;
  validator: Validator;

  @Input('object')
  set object(value: any) {
  	this.entity = Object.assign({}, value);
    if(!this.entity.id) {
      this.entity.ativo = 'S';
      this.entity.adm = 'S';
    }
  	this.resetMasks();
    this.confirmacaoSenha = "";
    this.ativo = this.entity.ativo;

    console.log('setObject agente'+ JSON.stringify(this.entity));
  }

  constructor(private agenteService: AgenteService, private popupController: PopupControllerComponent) {
    this.validator = new Validator();
    //console.log('constructor agente');
  }

  ngOnInit() {
    this.setCPFMask();
  }

  setCPFMask () {
	   $('.cpf').mask('000.000.000-00', {reverse: true});
     ​$('#usuario').keypress(function( e ) {
         if(e.which === 32)
             return false;
     })​​​​​;​
  }

  resetMasks() {
  	setTimeout(function() {
  	  $('.cpf').unmask().mask('000.000.000-00', {reverse: true});
      ​$('#usuario').keypress(function( e ) {
          if(e.which === 32)
              return false;
      })​​​​​;​
  	}, 500);
  }

  validaSenhas() {
    if(!this.entity.senha && this.entity.id)
      return true;
    if(this.entity.senha.length == 0 || this.entity.senha != $('#confirmacaoSenha').val()) {
  		return false;
  	}
  	return true;
  }

  onSubmit() {
    let params: URLSearchParams = new URLSearchParams();

    if(!this.validaCampos()){
      return false;
    }

    this.entity.cpfAgente = this.entity.cpfAgente.replace(/\D/g,'');
    this.entity.ativo = this.ativo;
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
                            this.resetMasks();
                          }, //Bind to view
                          err => {
                            this.popupController.showPopupMessage("Atenção!",
                            "Ocorreram erros ao salvar o registro! Por favor, tente novamente.", true);
                            console.log(err);
                            this.resetMasks();
                          });
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
    if(!this.validator.validaCPF(this.validator.limpaMascaraCPF(this.entity.cpfAgente))) {
      this.popupController.showPopupMessage("Atenção!", "O CPF informado não é válido.", true);
      return false;
    }

    if(!this.validaSenha() || !this.validaEmail())
      return false;

      return true;
  }

  deleteData () {
    var txt;
    var r = confirm("Deseja realmente remover esse registro?");
    if (r == true) {
      this.popupController.showPopupMessage("Aguarde!", "Removendo registro...", false);

      let params: URLSearchParams = new URLSearchParams();
      params = this.entity.id;
      // Deleta dado
      this.agenteService.deleteData(this.entity.id)
                        .subscribe(
                            result => {
                              if(result.status == 400) {
                                this.popupController.showPopupMessage("Atenção!", result.json(), true);
                              } else {

                                this.popupController.showPopupMessage("Atenção!",
                                "Registro removido com sucesso.", true);
                                $('#agenteModal').modal('hide'); // fecha modal
                                  $('#loadingModal').on('hidden.bs.modal', function () {
                                  $('#recarregaGrid').click();
                                  $('#loadingModal').unbind('hidden');
                                });
                              }
                              this.resetMasks();

                            }, //Bind to view
                            err => {
                              this.popupController.showPopupMessage("Atenção!",
                              "Ocorreram erros ao remover o registro! Por favor, tente novamente.", true);                              console.log(err);
                              console.log(err);
                            });
    }
  }

  setAtivo() {
    if(this.entity.ativo == 'S')
  		this.ativo = 'N';
  	if(this.entity.ativo == 'N')
  		this.ativo = 'S';

    console.log(this.entity.ativo);
  }

  alteraAdm(adm: string) {
    this.entity.adm = adm;
  }

  cancelar() {
    $('#recarregaGrid').click();
  }
}
