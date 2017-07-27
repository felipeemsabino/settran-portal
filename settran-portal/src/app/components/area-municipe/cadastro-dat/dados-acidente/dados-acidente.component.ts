import { Component, OnInit } from '@angular/core';
import { EDATService } from '../../../shared/services/e-dat.service';

declare var $:any; // JQUERY

@Component({
  selector: 'app-dados-acidente',
  templateUrl: './dados-acidente.component.html',
  styleUrls: ['dados-acidente.component.css']
})
export class DadosAcidenteComponent implements OnInit {

  tooltipAbalroamento = 'Abalroamento: ocorre quando um veículo em movimento é colhido lateral ou transversalmente, por um veículo, também em movimento.';
  tooltipChoque = 'Choque: é o impacto de um veículo em movimento contra qualquer obstáculo: poste, muro, árvore, etc., inclusive com outro veículo estacionado ou parado.';
  tooltipTombamento = 'Tombamento: ocorre quando o veículo sai de sua posição normal, se imobilizando sobre uma de suas laterais, sua frente ou sua traseira.';
  tooltipColisao = 'Colisão: é o impacto de dois ou mais veículos em movimento, frente a frente ou pela traseira.';
  tooltipCapotamento = 'Capotamento: quando um veículo em movimento gira em qualquer sentido, ficando com as rodas para cima, mesmo que momentaneamente.';
  
  constructor(private edatService: EDATService) {}

  ngOnInit() {
	this.configuraAutoComplete();
	this.setTooltips();
  }
  
  setTooltips() {
	$('[data-toggle="tooltip"]').tooltip();
  }
  
  alteraTipoAcidente(tipoAcidente: string) {
	this.edatService.eDAT.acidenteDat[0].tipoAcidente = tipoAcidente;
  }

  alteraZona(zona: string) {
	this.edatService.eDAT.acidenteDat[0].zona = zona;
  }
  
  configuraAutoComplete() {
    var self = this;
	
    $( function() {
	
		$( ".logradouro-auto-complete" ).autocomplete({
		  source: function( request, response ) {
			$.ajax( {
			  url: "http://ec2-52-67-135-39.sa-east-1.compute.amazonaws.com:8080/wsedat/rest/logradouroservice/recuperalogradouropordescricao",
			  dataType: "json",
			  data: {
				textologradouro: request.term
			  },
			  success: function( data ) {
				//response( data );
				response($.map(data, function(item) {
                    return {
                        label: item.tipoLogradouro+" "+item.nomeLogradouro,
                        value: item.nomeLogradouro,
						fullObject: item
                    }
                }))
			  },
			  beforeSend: function (xhr) { /* Authorization header */
				xhr.setRequestHeader("Authorization", "e96b4ae0-e36a-648f-134f-44171c2dcb18");
			  }
			} );
		  },
		  minLength: 3,
		  select: function( event, ui ) {
		  
			if(event.target.id == "logradouro")
				self.edatService.eDAT.acidenteDat[0].logradouro = ui.item.fullObject;
			else 
				self.edatService.eDAT.acidenteDat[0].logradouroCruzamento = ui.item.fullObject;
		  }
		} );
	} );
  }
}
