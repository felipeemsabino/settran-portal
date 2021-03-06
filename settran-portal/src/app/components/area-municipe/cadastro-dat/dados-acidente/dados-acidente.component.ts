import { Component, OnInit } from '@angular/core';
import { EDATService } from '../../../shared/services/e-dat.service';

declare var $:any; // JQUERY

@Component({
  selector: 'app-dados-acidente',
  templateUrl: './dados-acidente.component.html',
  styleUrls: ['dados-acidente.component.css']
})
export class DadosAcidenteComponent implements OnInit {

  constructor(public edatService: EDATService) {}

  ngOnInit() {
  	this.configuraAutoComplete();
  	this.setTooltips();
    this.applyDatePicker();
    this.resetMasks();
  }

  resetMasks() {
  	setTimeout(function() {
      $('.date-picker-settran').mask('00/00/0000');
  	}, 500);
  }

  applyDatePicker() {
     var me = this;
     $( ".date-picker-settran" ).datepicker({
       dateFormat: 'dd/mm/yy',
       changeMonth: true,
       changeYear: true,
       onSelect: function(date) {
         if(this.id == 'dataAcidente') {
           me.edatService.eDAT.acidenteDat[0].dataAcidente = date;
         }
       }
    });
  }

  setTooltips() {
    $('span[rel=popover]').popover({
        html: true,
        trigger: 'hover',
        placement: 'bottom',
        content: function(){return '<img width="250px" src="'+$(this).data('img') + '" />';}
      });
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
			  url: "http://ec2-54-232-223-144.sa-east-1.compute.amazonaws.com:8080/wsedat/rest/logradouroservice/recuperalogradouropordescricao",
			  dataType: "json",
			  data: {
				textologradouro: request.term
			  },
			  success: function( data ) {
				//response( data );
				response($.map(data, function(item) {
                    return {
                        label: item.nomeConcatenado,
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
