import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { URLSearchParams, QueryEncoder, Http, Response } from '@angular/http';
import { IDataService } from '../../interfaces/idata-service';
import { PopupControllerComponent } from '../popup-controller/popup-controller.component';
import { UserService } from '../../shared/services/user.service';

declare var $:any; // JQUERY

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['grid.component.css']
})
export class GridComponent implements OnInit {
  @Input('gridTitle') gridTitle: string;
  @Input('paginated') isPaginated: boolean;
  @Input('reorder') reorder: boolean;
  @Input('search') search: boolean;
  @Input('create') create: boolean;
  @Input('service') service: number;
  @Input('row_detail') rowDetail: any;
  @Input('columns') columnsConfiguration: any;

  @Output() onObjectChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(@Inject('IDataService') private providerService: IDataService[],
              private popupController: PopupControllerComponent, public userService: UserService) {
	   this.params = new URLSearchParams();
  }

  ngOnInit() {
    if(this.userService.userIsLogged() == true) {
    	this.getData();
    	this.setCPFMask();
    }
  }

  params: URLSearchParams; // parametro que será enviado para a tela de manutenção

  // Parametros para pesquisa. Filtros e paginção
  initialPosition: number = 0;     //paginação
  finalPosition: number = 10; //paginação
  paginaAtual: number = 0;//paginação
  numeroPaginas: number[]; // armazena o numero das paginas
  retornoQtdRestante: number = 0; // quantos fetchedData existem para serem mostrados em pesquisa
  fetchedData: any[];

  getData() {
    this.popupController.showPopupMessage("Aguarde!","Carregando registros...", false);

  	this.setUrlParams();
	  let retorno: any[];
    // Get all data

    this.providerService[this.service].getData(this.params).subscribe(
            result => {
							if(result.length > 0 || result["id"]) {
								if(this.isPaginated)
									this.retornoQtdRestante = Number((<any>result.pop()).split(":")[1].replace("}",""));

					        this.fetchedData = result;

								if(this.isPaginated)
									this.createRange();
							}
							this.popupController.hidePopupMessage(); // fecha modal
							this.resetMasks();
            }, //Bind to view
            err => {
              console.log(err);
							this.popupController.showPopupMessage("Atenção!",
              "Ocorreram erros ao carregar os registros. Por favor, tente novamente.", true) // fecha modal
            });
  }

  setUrlParams() {
  	this.params = new URLSearchParams();
  	for(var index = 0;index < this.columnsConfiguration.length;index++) {
      if(this.columnsConfiguration[index].filter === true) {
    		if(this.columnsConfiguration[index].class == 'cpf') {
    		  this.params.set(this.columnsConfiguration[index].attr, this.columnsConfiguration[index].value.replace(/\D/g,''));
    		} else {
            if(this.columnsConfiguration[index].filterName)
    	       this.params.set(this.columnsConfiguration[index].filterName, this.columnsConfiguration[index].value);
            else
    	       this.params.set(this.columnsConfiguration[index].attr, this.columnsConfiguration[index].value);
    		}
  	  }
  	}
    if(this.isPaginated) {
      this.params.set('initialPosition', ""+this.initialPosition);
      this.params.set('finalPosition', ""+this.finalPosition);
    }
  }

  /* Método auxiliar da paginação.
  * Calcula a página atual que o usuário se encontra e a próxima página.
  */
  calculaRange(proximaPagina: number) {
    console.log('Pagina atual -> ' + this.paginaAtual + ' Proxima pagina -> '+proximaPagina);

    this.initialPosition = (proximaPagina-1)*this.finalPosition;
    this.paginaAtual = proximaPagina;
    this.getData();
  }

  /*
  * Calcula quantas páginas serão necessárias para mostrar todos os resultados da pesquisa.
  * Essa função é chamada diretamente no HTML para criar os números de paginção abaixo da tabela.
  */
  createRange(){
    this.numeroPaginas = [];
    if(this.retornoQtdRestante === undefined){
  		return;
  	}

    var paginas: number = //Number((this.retornoQtdRestante/10).toFixed(0)); //10 itens por pagina
    paginas = Number((this.retornoQtdRestante/10).toFixed(0)) == 0 ? 1 : Number((this.retornoQtdRestante/10).toFixed(0));
    for(var i = 0; i <= paginas; i++){
       this.numeroPaginas.push(i+1);
    }
  }

  /*
  * Quando o usuário clica em pesquisar é necessário buscar os resultados
  * a partir da primeira página.
  */
  getFilteredData() {
    this.calculaRange(1);
  }

  callObjectWindow(object: any) {
	   this.onObjectChange.emit(object);
  }

  moveUp(rowNumber: any) {
	console.log(rowNumber);
	let currentObj = this.fetchedData[rowNumber];
	currentObj.ordem = currentObj.ordem-1; // alterando ordem de quem é descolado
	this.fetchedData[rowNumber] = this.fetchedData[rowNumber-1];
	this.fetchedData[rowNumber].ordem = this.fetchedData[rowNumber].ordem+1;
	this.fetchedData[rowNumber-1] = currentObj;
	this.reorderData(currentObj, this.fetchedData[rowNumber]);
  }

  moveDown(rowNumber: any) {
	console.log(rowNumber);
	let currentObj = this.fetchedData[rowNumber];
	currentObj.ordem = currentObj.ordem+1;
	this.fetchedData[rowNumber] = this.fetchedData[rowNumber+1];
	this.fetchedData[rowNumber].ordem = this.fetchedData[rowNumber].ordem-1;
	this.fetchedData[rowNumber+1] = currentObj;
	this.reorderData(currentObj, this.fetchedData[rowNumber]);
  }

  reorderData(movedRow: any, row: any) {
    this.popupController.showPopupMessage("Aguarde!","Reordenando registros...", false);

	let body = [];
	body.push(movedRow);
	body.push(row);

    this.providerService[this.service].reorderData(JSON.stringify(body))
                      .subscribe(
                          result => {
                            this.popupController.hidePopupMessage();
                          }, //Bind to view
                          err => {
                            console.log(err);
                            this.popupController.showPopupMessage("Atenção!",
                            "Ocorreram erros ao reordenar os registros! Por favor, tente novamente.", true);
                            $('#recarregaGrid').click();
                          });
  }

  setCPFMask () {
	$('.cpf').mask('000.000.000-00', {reverse: true});
  }

  resetMasks() {
	setTimeout(function() {
	  $('.cpf').unmask().mask('000.000.000-00', {reverse: true});
	}, 500);
  }
}
