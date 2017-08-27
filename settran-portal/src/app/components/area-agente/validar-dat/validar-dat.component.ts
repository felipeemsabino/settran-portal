import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, NavigationExtras } from '@angular/router';
import { PopupControllerComponent } from '../../shared/popup-controller/popup-controller.component';
import { VisualizarDatComponent } from '../../shared/visualizar-dat/visualizar-dat.component';
import { EdatStorageService } from '../../shared/services/edat-storage.service';
import { EDATService } from '../../shared/services/e-dat.service';
import { UserService } from '../../shared/services/user.service';
import { ValidardatService } from './services/validardat.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { URLSearchParams } from '@angular/http';


declare var $:any; // JQUERY

@Component({
  selector: 'app-validar-dat',
  templateUrl: './validar-dat.component.html',
  styleUrls: ['./validar-dat.component.css'],
  providers: [ValidardatService]
})
export class ValidarDatComponent implements OnInit {
  gridTitle: string = "Validar DAT";
  object: any = {};
  mostrarGrid: boolean = true;
  sub: any;
  nomeAgente: string;

  constructor(private validarDATService: ValidardatService, private parentRouter: Router, private edatStorage: EdatStorageService,
   private edatService: EDATService, private userService: UserService,
   private popupController: PopupControllerComponent) {
  }

  ngOnInit() {
    this.userService.userIsLogged();
    this.nomeAgente = this.userService.nomeUsuario;
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
            me.parentRouter.navigate(['area-agente/validar-dat']);
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

  alteraSituacaoDAT() {
    this.edatService.eDAT.situacaoDat = $('select[id=situacaoDAT]').val();
  }

  validaParametrosParecer() {
    let retorno: boolean = true;
    if(this.edatService.eDAT.textoValidacao.length == 0) {
      $('#parecerDAT').parent().addClass('has-error');
      retorno = false;
    }
    if(this.edatService.eDAT.situacaoDat.length == 0) {
      $('#situacaoDAT').parent().addClass('has-error');
      retorno = false;
    }

    return retorno;
  }

  removeClasseErro() {
    $('#parecerDAT').parent().removeClass('has-error');
    $('#situacaoDAT').parent().removeClass('has-error');
  }

  validarDAT() {
    this.removeClasseErro();
    if(!this.validaParametrosParecer()) {
      this.popupController.showPopupMessage('Atenção','Favor preencher os campos antes de prosseguir.',true);
      return false;
    }

    let params: URLSearchParams = new URLSearchParams();

    this.popupController.showPopupMessage("Aguarde!", "Validação da DAT sendo registrada.", false);

		this.edatService.limpaAtributosBranco();
		console.log(JSON.stringify(this.edatService.eDAT));

    params = this.edatService.eDAT;

    var me = this;
    // Salva dado
    this.validarDATService.saveData(params)
                      .subscribe(
                          result => {
                            if(result.status == 400) {
                              this.popupController.showPopupMessage("Atenção!", result.json(), true);
                            } else {
                              this.popupController.showPopupMessage("Atenção!",
                              "DAT validada com sucesso.", true);

                                $('#loadingModal').on('hidden.bs.modal', function () {
                                  me.mostrarGrid = true;
                                  me.parentRouter.navigate(['area-agente/validar-dat']);
                                });
                            }
                          }, //Bind to view
                          err => {
                            this.popupController.showPopupMessage("Atenção!",
                            "Ocorreram erros ao salvar o registro! Por favor, tente novamente.", true);                              console.log(err);
                          });
  }

  public updateObjectParameter(edatObject: any):void {
	   this.object = edatObject;
     this.mostrarGrid = false;
     this.edatService.limparDados();
     this.edatService.eDAT = edatObject;
     this.edatService.eDAT.situacaoDat = '';
     this.edatService.eDAT.textoValidacao = '';
     if(!this.edatService.eDAT.acidenteDat[0].logradouroCruzamento) {
       this.edatService.eDAT.acidenteDat[0].logradouroCruzamento = {
         "id":"",
         "nomeLogradouro":"",
         "tipoLogradouro":""
       };
     }
    /* this.edatService.eDAT.fotosDat[0] = {
       descricaoFoto: "asd 1", urlFoto: "aaa.jpg", decodeImagem: ""
     }

     this.edatService.eDAT.fotosDat[1] = {
       descricaoFoto: "asd 2", urlFoto: "", decodeImagem: ""
     }

     this.edatService.eDAT.fotosDat[2] = {
       descricaoFoto: "asd 3", urlFoto: "", decodeImagem: ""
     }

     this.edatService.eDAT.fotosDat[3] = {
       descricaoFoto: "asd 4", urlFoto: "", decodeImagem: ""
     }

     this.edatService.eDAT.fotosDat[4] = {
       descricaoFoto: "asd 5", urlFoto: "", decodeImagem: ""
     }*/
     this.edatService.desabilitarEdicaoCampos();
     this.parentRouter.navigate(['/area-agente/validar-dat/visualizar-dat/']);
   }
}
