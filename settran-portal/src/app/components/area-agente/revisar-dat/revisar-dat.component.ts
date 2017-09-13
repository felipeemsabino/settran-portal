import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, NavigationExtras } from '@angular/router';
import { PopupControllerComponent } from '../../shared/popup-controller/popup-controller.component';
import { VisualizarDatComponent } from '../../shared/visualizar-dat/visualizar-dat.component';
import { EdatStorageService } from '../../shared/services/edat-storage.service';
import { EDATService } from '../../shared/services/e-dat.service';
import { UserService } from '../../shared/services/user.service';
import { RevisardatService } from './services/revisardat.service';
import { URLSearchParams } from '@angular/http';


declare var $:any; // JQUERY

@Component({
  selector: 'app-revisar-dat',
  templateUrl: './revisar-dat.component.html',
  styleUrls: ['./revisar-dat.component.css'],
  providers: [RevisardatService]
})
export class RevisarDatComponent implements OnInit {
  gridTitle: string = "Revisar DAT";
  object: any = {};
  mostrarGrid: boolean = true;
  sub: any;
  mostrarPainelRetificacao: boolean = false;
  situacaoDatRet: string = '';
  mostrarBotaoRevisar: boolean = false;
  textoValidacao: string = "";
  textoValidacaoOriginal: string = "";

  constructor(private parentRouter: Router, private edatStorage: EdatStorageService,
   public edatService: EDATService, public userService: UserService,
   private popupController: PopupControllerComponent, private revisarDATService: RevisardatService) {
     this.mostrarPainelRetificacao = false;
     this.mostrarBotaoRevisar = false;
     this.textoValidacao = "";
  }

  alteraSituacaoDAT(situacao: string) {
    this.situacaoDatRet = situacao;
    this.edatService.eDAT.situacaoDat = this.situacaoDatRet;

    if(situacao == 'DEF') {
      this.mostrarPainelRetificacao = false;
      this.edatService.limparDados();
      this.edatService.habilitarEdicaoCampos();

      if(!this.edatService.eDAT.situacaoDat)
       this.edatService.eDAT.situacaoDat = '';

      if(!this.edatService.eDAT.textoValidacao)
       this.edatService.eDAT.textoValidacao = '';

      if(!this.edatService.eDAT.usuarioAgente)
       this.edatService.eDAT.agente = { 'id':'' };

       if(!this.edatService.eDAT.acidenteDat[0].logradouroCruzamento) {
         this.edatService.eDAT.acidenteDat[0].logradouroCruzamento = {
           "id":"",
           "nomeLogradouro":"",
           "tipoLogradouro":""
         };
       }
      this.textoValidacao = '';
      this.parentRouter.navigate(['/area-agente/revisar-dat/visualizar-dat/']);
    } else this.parentRouter.navigate(['/area-agente/revisar-dat/']);

  }

  ngOnInit() {
    this.userService.userIsLogged();
    this.mostrarGrid = true;
    this.mostrarPainelRetificacao = false;
    this.situacaoDatRet = '';
    this.mostrarBotaoRevisar = false;
    this.textoValidacao = "";
    $('#loadingModal').on('hidden.bs.modal', function () {});
    this.alteraCorItemSelecionado();
  }

  alteraCorItemSelecionado() {
    $('.menu-item').removeClass('menu-item-selecionado');
    $('.sub-menu-revisar').addClass('menu-item-selecionado');
  }

  cancelar() {
    var me = this;

     $( "#alertDialogText" ).dialog({
       title:"Alerta",
       modal: true,
       dialogClass: "no-close",
       buttons: [
         {
           text: "Sim",
           click: function() {
              me.mostrarGrid = true;
              this.mostrarBotaoCancelar = false;
              me.parentRouter.navigate(['area-agente']);
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

  revisarDAT() {
    if(this.situacaoDatRet.trim().length == 0) {
      this.popupController.showPopupMessage("Atenção!", "Selecione Deferir ou Indeferir antes de prosseguir.", true);
      return;
    }

    this.edatService.eDAT.agente = { "id": this.userService.getUsetData().id };

    this.edatService.eDAT.textoValidacao = (this.textoValidacaoOriginal ? this.textoValidacaoOriginal : "") +
    " " + this.textoValidacao + " (Atualizado por: " + this.userService.getUserName() + " em " +
    $.datepicker.formatDate( "dd/mm/yy", new Date() ) + ")";

    if(this.edatService.eDAT.textoValidacao) {
      this.edatService.eDAT.textoValidacao = this.edatService.eDAT.textoValidacao.trim();
    }
    let params: URLSearchParams = new URLSearchParams();
    this.edatService.limpaAtributosBranco();
    this.edatService.removeMascaraCPF();
    params = this.edatService.eDAT;
    console.log(JSON.stringify(this.edatService.eDAT, null, 2));
    this.popupController.showPopupMessage("Aguarde!", "Revisão da DAT sendo registrada.", false);

    var me = this;
    // Salva dado
    this.revisarDATService.saveData(params)
                      .subscribe(
                          result => {
                            if(result.status == 400) {
                              this.popupController.showPopupMessage("Atenção!", result.json(), true);
                              this.edatService.eDAT.textoValidacao = this.textoValidacaoOriginal;
                            } else {
                              this.popupController.showPopupMessage("Atenção!",
                              "DAT revisada com sucesso.", true);

                                $('#loadingModal').on('hidden.bs.modal', function () {
                                  me.mostrarGrid = true;
                                  me.mostrarPainelRetificacao = false;
                                  me.mostrarBotaoRevisar = false;
                                  me.parentRouter.navigate(['area-agente/revisar-dat']);
                                  $('#loadingModal').unbind();
                                });
                            }
                          }, //Bind to view
                          err => {
                            this.edatService.eDAT.textoValidacao = this.textoValidacaoOriginal;
                            this.popupController.showPopupMessage("Atenção!",
                            "Ocorreram erros ao salvar o registro! Por favor, tente novamente.", true);                              console.log(err);
                          });
  }

  public updateObjectParameter(edatObject: any):void {
    console.log('updateObjectParameter revisar-dat');
    console.log(this.edatService.eDAT.textoValidacao);
    console.log(this.edatService.eDAT.situacaoDat);

    console.log("adasdsdsa");
	   this.object = edatObject;
     this.edatService.eDAT = edatObject;
     this.mostrarPainelRetificacao = true;
     this.mostrarBotaoRevisar = true;
     this.textoValidacao = '';
     this.situacaoDatRet = '';
     this.textoValidacaoOriginal = this.edatService.eDAT.textoValidacao;
  }
}
