import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { URLSearchParams, QueryEncoder, Http, Response } from '@angular/http';
import { IDataService } from '../../interfaces/idata-service';

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
  @Input('service') service: number;
  @Input('row_detail') rowDetail: any;
  @Input('columns') columnsConfiguration: any;
  
  @Output() onObjectChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(@Inject('IDataService') private providerService: IDataService[]) {
	this.params = new URLSearchParams();
  }

  ngOnInit() {
	this.getData();
  }

  params: URLSearchParams; // parametro que será enviado para a tela de manutenção

  // Parametros para pesquisa. Filtros e paginção
  initialPosition: number = 1;     //paginação
  finalPosition: number = 10; //paginação
  paginaAtual: number = 0;//paginação
  numeroPaginas: number[]; // armazena o numero das paginas
  retornoQtdRestante: number = 0; // quantos fetchedData existem para serem mostrados em pesquisa
  fetchedData: any[];
	
  getData() {
	$('#loadingModal').modal('show'); // abre loadingModal
	
  	this.setUrlParams();
	let retorno: any[];
    // Get all data

    this.providerService[this.service].getData(this.params)
                      .subscribe(
                          result => {
							if(result.length > 0) {
								if(this.isPaginated)
									this.retornoQtdRestante = Number((<any>result.pop()).split(":")[1].replace("}",""));
								
								this.fetchedData = result;
								
								if(this.isPaginated)
									this.createRange();
							}
							$('#loadingModal').modal('hide'); // fecha modal
                          }, //Bind to view
                          err => {
                            console.log(err);
							alert('Ocorreram erros ao recuperar os registros! Por favor, tente novamente!');
							$('#loadingModal').modal('hide'); // fecha modal
                          });
  }
  
  setUrlParams() {
	this.params = new URLSearchParams();
	for(var index = 0;index < this.columnsConfiguration.length;index++) {
      if(this.columnsConfiguration[index].filter === true) {
	    this.params.set(this.columnsConfiguration[index].attr, this.columnsConfiguration[index].value);
	  }
	}
	this.params.set('initialPosition', ""+this.initialPosition);
    this.params.set('finalPosition', ""+this.finalPosition);
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

    var paginas: number = Number((this.retornoQtdRestante/10).toFixed(0)); //10 itens por pagina

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
	$('#loadingModal').modal('show'); // abre loadingModal
	
	let body = [];
	body.push(movedRow);
	body.push(row);

    this.providerService[this.service].reorderData(JSON.stringify(body))
                      .subscribe(
                          result => {
						    console.log('resultado reordenar -> '+result);
							alert('Registros reordenados com sucesso!');
							$('#loadingModal').modal('hide'); // fecha modal
                          }, //Bind to view
                          err => {
                            console.log(err);
							alert('Ocorreram erros ao reordenar os registros! Por favor, tente novamente!');
							$('#loadingModal').modal('hide'); // fecha modal
                            $('#recarregaGrid').click();
                          });
  }
}