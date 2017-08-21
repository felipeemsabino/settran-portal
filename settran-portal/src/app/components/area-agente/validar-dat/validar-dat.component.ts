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
  gridTitle: string = "Validar eDAT";
  object: any = {};
  mostrarGrid: boolean = true;
  sub: any;

  constructor(private validarDATService: ValidardatService, private parentRouter: Router, private edatStorage: EdatStorageService,
   private edatService: EDATService, private userService: UserService,
   private popupController: PopupControllerComponent) {
  }

  ngOnInit() {
    this.userService.userIsLogged();
  }

  cancelar() {
    this.mostrarGrid = true;
    this.parentRouter.navigate(['area-agente/validar-dat']);
  }

  alteraSituacaoDAT() {
    this.edatService.eDAT.situacaoDat = $('select[id=situacaoDAT]').val();
  }

  validaParametrosParecer() {
    if(this.edatService.eDAT.situacaoDat.length == 0 || this.edatService.eDAT.textoValidacao.length == 0) {
      this.popupController.showPopupMessage('Atenção','Favor preencher os campos antes de prosseguir.',true);
      return false;
    }
    return true;
  }

  validarDAT() {

    if(!this.validaParametrosParecer()) {
      return false;
    }
    let params: URLSearchParams = new URLSearchParams();

    this.popupController.showPopupMessage("Aguarde!", "Salvando registros...", false);
    params = this.edatService.eDAT;

    // Salva dado
    this.validarDATService.saveData(params)
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

  public updateObjectParameter(edatObject: any):void {
	   this.object = edatObject;
     this.mostrarGrid = false;
     this.edatService.limparDados();
     this.edatService.eDAT = edatObject;
     this.edatService.eDAT.situacaoDat = '';
     this.edatService.eDAT.textoValidacao = '';
     this.edatService.desabilitarEdicaoCampos();
     this.parentRouter.navigate(['/area-agente/validar-dat/visualizar-dat/']);
   }
}
