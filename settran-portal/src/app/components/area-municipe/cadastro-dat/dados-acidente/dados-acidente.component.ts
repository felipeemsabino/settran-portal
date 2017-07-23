import { Component, OnInit } from '@angular/core';
import { EDATService } from '../../../shared/services/e-dat.service';

declare var $:any; // JQUERY

@Component({
  selector: 'app-dados-acidente',
  templateUrl: './dados-acidente.component.html',
  styleUrls: ['dados-acidente.component.css']
})
export class DadosAcidenteComponent implements OnInit {

  constructor(private edatService: EDATService) { }

  ngOnInit() {
	this.configuraAutoComplete();
  }

  alteraTipoAcidente(tipoAcidente: string) {
	console.log('alteraTipoAcidente -> '+ tipoAcidente);
  }

  alteraZona(zona: string) {
	console.log('alteraZona -> '+ zona);
  }
  
  configuraAutoComplete() {
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
                        value: item.nomeLogradouro
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
			console.log( "Selected: " + ui );
		  }
		} );
	} );
  }
}
