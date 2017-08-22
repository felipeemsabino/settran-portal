import { Component, OnInit, Input } from '@angular/core';
import { EDATService } from '../../../shared/services/e-dat.service';
import { VeiculoService } from '../../../shared/services/veiculo.service';
import { EnderecoService } from '../../../shared/services/endereco.service';
import { URLSearchParams } from '@angular/http';
import { PopupControllerComponent } from '../../../shared/popup-controller/popup-controller.component';

declare var $:any; // JQUERY

@Component({
  selector: 'app-seu-veiculo',
  templateUrl: './seu-veiculo.component.html',
  styleUrls: ['./seu-veiculo.component.css'],
  providers: [VeiculoService, EnderecoService]
})
export class SeuVeiculoComponent implements OnInit {

  constructor(public edatService: EDATService, private veiculoService: VeiculoService,
    private enderecoService: EnderecoService, private popupController: PopupControllerComponent) {
  }

  ngOnInit() {
    if(this.edatService.tiposVeiculo.length == 0) {
  	  this.getTiposVeiculo();
  	}
  	this.resetMasks();
    this.applyDatePicker();
  	if(!this.edatService.seuVeiculoMarcas && !this.edatService.seuVeiculoModelos) {
  	  this.edatService.seuVeiculoMarcas = new Array();
  	  this.edatService.seuVeiculoModelos = new Array();
  	}
  }

  applyDatePicker() {
     $( ".date-picker-settran" ).datepicker({
       dateFormat: 'dd/mm/yy'
     });
  }
  resetMasks() {
  	setTimeout(function() {
  		$('.cep').mask('00000-000');
  		$('.phone').mask('(00) 0000-0000');
  		$('.phone_with_ddd').mask('(00) 00000-0000');
  		$('.cpf').mask('000.000.000-00', {reverse: true});
      $('.placa').mask('SSS-0000');
      $('.renavam').mask('00000000000');
      $('.cnh').mask('00000000000');
      $('.categoria-cnh').mask('SSS');

  	}, 500);
  }

  resetCPFMask() {
	setTimeout(function() {
		$('#docProprietario').unmask().mask('000.000.000-00', {reverse: true});
	}, 500);
  }

  alteraPossuiSeguro(possuiSeguro: string) {
	this.edatService.eDAT.temSeguro = possuiSeguro;
  }

  alteraSexo(sexo: string) {
	this.edatService.eDAT.sexo = sexo;
  }

  setDadosProprietario() {
    this.edatService.eDAT.isPropietario = this.edatService.eDAT.isPropietario == 'S' ? 'N' : 'S';
  	console.log(' -> '+this.edatService.eDAT.isPropietario);
  	if(this.edatService.eDAT.isPropietario == 'N') {
  		this.edatService.eDAT.nomePropietario = '';
  		this.edatService.eDAT.docPropietario = '';
  		return;
  	}
    this.edatService.eDAT.nomePropietario = this.edatService.eDAT.nomeMunicipe;
  	let doc = this.edatService.eDAT.cpf.replace(/\D/g,'');
  	this.edatService.eDAT.docPropietario = doc;
    this.resetCPFMask();
  }

  getTiposVeiculo() {

    this.veiculoService.getTiposVeiculo(new URLSearchParams())
                      .subscribe(
                          result => {
							             this.edatService.tiposVeiculo = result;
                          }, //Bind to view
                          err => {
                            console.log(err);
                          });
  }

  getMarcasVeiculo() {
    let tipoVeiculoDesc = $("#tipoVeiculo option:selected").text();
    let tipoVeiculoVal = $( '#tipoVeiculo' ).val();

    if(tipoVeiculoVal === "") {
  	  return;
  	}

	this.edatService.eDAT.tipoVeiculo.id = tipoVeiculoVal;

  this.popupController.showPopupMessage("Atenção!",
  'Carregando marcas.', false);

	this.veiculoService.getMarcasVeiculo(tipoVeiculoDesc)
				  .subscribe(
					  result => {
  						console.log(this.edatService);
  						this.edatService.seuVeiculoMarcas = result;
  						this.edatService.seuVeiculoModelos = new Array();

  						this.popupController.hidePopupMessage();
					  }, //Bind to view
					  err => {
  						console.log(err);
              this.popupController.showPopupMessage("Atenção!",
              'Não foi possível carregar as marcas.', true);
					  });
  }

  getModelosVeiculo(){
    let tipoVeiculoDesc = $("#tipoVeiculo option:selected").text();
  	let tipoVeiculoVal = $( '#tipoVeiculo' ).val();
  	let marcaVeiculoVal = $( '#marcaVeiculo' ).val();
    let marcaVeiculoDesc = $("#marcaVeiculo option:selected").text();

    if(tipoVeiculoVal === "" || marcaVeiculoVal === "") {
  	  return;
  	}

	this.edatService.eDAT.marcaVeiculo = marcaVeiculoDesc;

  this.popupController.showPopupMessage("Atenção!",
  'Carregando modelos.', false);

	this.veiculoService.getModelosVeiculo(tipoVeiculoDesc, marcaVeiculoVal)
				  .subscribe(
					  result => {
						this.edatService.seuVeiculoModelos = result;
            this.popupController.hidePopupMessage();
					  }, //Bind to view
					  err => {
						console.log(err);

            this.popupController.showPopupMessage("Atenção!",
            'Não foi possível carregar os modelos.', true);					  });
  }

  setModeloVeiculo () {
    let modeloVeiculoDesc = $("#modeloVeiculo option:selected").text();
	  this.edatService.eDAT.modeloVeiculo = modeloVeiculoDesc;
  }

  getCEP() { //38411876
	   let cep = $( '#cep' ).val();

    if(cep === "") {
      return;
    }

  	let params: URLSearchParams = new URLSearchParams();
  	params.set("cep", cep.replace(/\D/g,'')); // remove nao numericos

    this.popupController.showPopupMessage("Atenção!",
    'Buscando endereço.', false);

  	this.enderecoService.getCEP(params)
  				  .subscribe(
  					  result => {
    						if(result.length > 0) {
    						  this.edatService.eDAT.logradouro = result[0];
    						  console.log(this.edatService.eDAT);
    						}
                this.popupController.hidePopupMessage();
              }, //Bind to view
  					  err => {
    						console.log(err);
                this.popupController.showPopupMessage("Atenção!",
                'Não foi possível buscar o endereço.', false);
  					  });
  }

}
