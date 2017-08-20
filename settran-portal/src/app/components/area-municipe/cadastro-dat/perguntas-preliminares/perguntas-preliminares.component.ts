import { Component, OnInit, Input } from '@angular/core';
import { URLSearchParams, QueryEncoder, Http, Response } from '@angular/http';
import { RegrasService } from '../../../area-admin/cadastro-regra/services/regras.service';
import { EDATService } from '../../../shared/services/e-dat.service';

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

  constructor(private regrasService: RegrasService, public edatService: EDATService) {
  }

  ngOnInit() {
    if(this.edatService.resultadoPerguntas.length == 0)
	    this.getData();
  }

  getData() {

	$('#loadingModal').modal('show');

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
              							$('#loadingModal').modal('hide'); // fecha modal
                            }, //Bind to view
                            err => {
                                            console.log(err);
                							alert('Ocorreram erros ao recuperar os registros! Por favor, tente novamente!');
                							$('#loadingModal').modal('hide'); // fecha modal
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
