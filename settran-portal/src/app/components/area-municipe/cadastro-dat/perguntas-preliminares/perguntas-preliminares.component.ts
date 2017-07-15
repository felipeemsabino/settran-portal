import { Component, OnInit } from '@angular/core';
import { URLSearchParams, QueryEncoder, Http, Response } from '@angular/http';
import { RegrasService } from '../../../area-admin/cadastro-regra/services/regras.service';

declare var $:any; // JQUERY

@Component({
  selector: 'app-perguntas-preliminares',
  templateUrl: './perguntas-preliminares.component.html',
  styleUrls: ['./perguntas-preliminares.component.css'],
  providers: [RegrasService]
})
export class PerguntasPreliminaresComponent implements OnInit {
  
  params: URLSearchParams;
  perguntas: any;
  
  constructor(private regrasService: RegrasService) {}

  ngOnInit() {
	this.getData();
  }

  getData() {
	$('#loadingModal').modal('show');
	
  	this.setUrlParams();

    this.regrasService.getData(this.params)
                      .subscribe(
                          result => {
							if(result.length > 0) {
								this.perguntas = result;
							}
							$('#loadingModal').modal('hide'); // fecha modal
                          }, //Bind to view
                          err => {
                            console.log(err);
							alert('Ocorreram erros ao recuperar os registros! Por favor, tente novamente!');
							$('#loadingModal').modal('hide'); // fecha modal
                          });
  }
  
  alteraResposta (resposta: string) {
	//alert(resposta);
  }
  
  setUrlParams() {
	this.params = new URLSearchParams();
  }
}
