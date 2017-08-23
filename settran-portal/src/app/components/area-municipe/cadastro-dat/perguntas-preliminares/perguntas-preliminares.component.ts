import { Component, OnInit, Input } from '@angular/core';
import { URLSearchParams, QueryEncoder, Http, Response } from '@angular/http';
import { RegrasService } from '../../../area-admin/cadastro-regra/services/regras.service';
import { EDATService } from '../../../shared/services/e-dat.service';
import { PopupControllerComponent } from '../../../shared/popup-controller/popup-controller.component';

declare var $:any; // JQUERY

@Component({
  selector: 'app-perguntas-preliminares',
  templateUrl: './perguntas-preliminares.component.html',
  styleUrls: ['./perguntas-preliminares.component.css'],
  providers: [RegrasService]
})
export class PerguntasPreliminaresComponent implements OnInit {
  params: URLSearchParams;
  perguntas: any[];
  perguntasUsuario: any[];

  constructor(private regrasService: RegrasService, public edatService: EDATService,
    private popupController: PopupControllerComponent) {
  }

  ngOnInit() {
    if(this.edatService.resultadoPerguntas.length == 0)
	    this.getData();
  }

  getData() {

    this.popupController.showPopupMessage("Aguarde!", 'Carregando perguntas preliminares.', false);

  	this.setUrlParams();

    this.regrasService.getData(this.params).subscribe(
                          result => {
              							if(result.length > 0) {
                              let index = 0;
                              result.forEach((r) => {
                                this.edatService.resultadoPerguntas.push(Object.assign({}, r));
                                this.edatService.perguntas.push(Object.assign({}, r));
                                this.edatService.perguntas[index].resposta = "";
                                index++;
            							    });
              							}
                            this.popupController.hidePopupMessage();
                            }, //Bind to view
                            err => {
                              console.log(err);
                              this.popupController.showPopupMessage("Atenção!", 'Ocorreram erros ao carregar as perguntas preliminares.', true);
                            });
  }

  alteraResposta (id: any, resposta: string) {
    let index = 0;
    for (let p of this.edatService.perguntas) {
  	  if(p.id == id) {
  		    p.resposta = resposta;
          if(resposta != this.edatService.resultadoPerguntas[index].resposta) {
            this.edatService.respostasInvalidas = new Array();
            this.edatService.respostasInvalidas.push(this.edatService.resultadoPerguntas[index]);
            $('#modalAlertaRegras').modal('show');
          }
  	  }
      index++;
  	}
  }

  setUrlParams() {
	   this.params = new URLSearchParams();
  }
}
