import { Component, OnInit } from '@angular/core';
import { EDATService } from '../../../shared/services/e-dat.service';
import { VeiculoService } from '../../../shared/services/veiculo.service';
import { EnderecoService } from '../../../shared/services/endereco.service';
import { URLSearchParams } from '@angular/http';
import { PopupControllerComponent } from '../../../shared/popup-controller/popup-controller.component';

declare var $:any; // JQUERY

@Component({
  selector: 'app-outros-veiculos',
  templateUrl: './outros-veiculos.component.html',
  styleUrls: ['./outros-veiculos.component.css'],
  providers: [VeiculoService, EnderecoService]
})
export class OutrosVeiculosComponent implements OnInit {

  constructor(private veiculoService: VeiculoService, private enderecoService: EnderecoService,
    public edatService: EDATService, private popupController: PopupControllerComponent) {}

  ngOnInit() {
    if(this.edatService.tiposVeiculo.length == 0) {
  	  this.getTiposVeiculo();
  	}

  	if(!this.edatService.arraysMarcasVeiculo && !this.edatService.arraysModeloVeiculo) {
  	  this.edatService.arraysMarcasVeiculo = new Array();
  	  this.edatService.arraysModeloVeiculo = new Array();
  	}
    this.resetFiledsConfigurations();
  }

  resetFiledsConfigurations() {
    this.resetMasks();
  }

  resetMasks() {
		$('.cep').mask('00000-000');
		$('.phone_with_ddd').mask('(00) 00000-0000');
		$('.cpf').mask('000.000.000-00', {reverse: true});
    $('.placa').mask('SSS-0000');
    $('.renavam').mask('00000000000');
    $('.cnh').mask('00000000000');
    $('.categoria-cnh').mask('SSS');
    $('.orgao-exp').mask('SSSSSSSSSS');
  }

  removerVeiculo(index: number) {
    var txt;
    var r = confirm("Deseja realmente remover esse registro?");
    if (r == true) {
      this.edatService.eDAT.outrosVeiculosDat.splice(index, 1);
    }
  }

  adicionaVeiculo() {
  	var self = this;

  	this.edatService.eDAT.outrosVeiculosDat.push({
  		"placa": "",
  		"marcaVeiculo": "",
  		"modeloVeiculo": "",
  		"tipoVeiculo": {
  			"id": ""
  		},
  		"temSeguro":"",
  		"cnh": "",
  		"cpf": "",
  		"rg": "",
  		"orgaoExpedidor": "",
  		"nomeCondutorOutroVeiculo": "",
  		"logradouro":{
  			"id":"",
  			"nomeLogradouro":"",
  			"tipoLogradouro":"",
  			"nomeBairro":"",
  			"cep":"",
  			"nomeCidade":"",
  			"uf":""
  		},
  		"complementoEndereco": "",
  		"telefone": ""
  	});
  }

  alteraPossuiSeguro(possuiSeguro: string, currentElementIndex: number) {
	   this.edatService.eDAT.outrosVeiculosDat[currentElementIndex].temSeguro = possuiSeguro;
  }

  getTiposVeiculo() {
    this.popupController.showPopupMessage("Atenção!",
    'Carregando tipos de veículo.', false);
    this.veiculoService.getTiposVeiculo(new URLSearchParams()).subscribe(
                          result => {
							              this.edatService.tiposVeiculo = result;
                          }, //Bind to view
                          err => {
                            console.log(err);
                            this.popupController.hidePopupMessage();
                          });
  }

  getMarcasVeiculo(currentElementIndex: number) {
    let tipoVeiculoDesc = $("#tipoVeiculo"+currentElementIndex+" option:selected").text();
    let tipoVeiculoVal = $( '#tipoVeiculo'+currentElementIndex ).val();

    if(tipoVeiculoVal === "") {
      return;
    }

    this.edatService.eDAT.outrosVeiculosDat[currentElementIndex].tipoVeiculo.id = tipoVeiculoVal;

    this.popupController.showPopupMessage("Atenção!",
    'Carregando marcas.', false);
    this.veiculoService.getMarcasVeiculo(tipoVeiculoDesc).subscribe(
      result => {
          this.edatService.arraysMarcasVeiculo[currentElementIndex] = result;
          this.edatService.arraysModeloVeiculo[currentElementIndex] = new Array();

          this.popupController.hidePopupMessage();
      }, //Bind to view
      err => {
        console.log(err);
        this.popupController.hidePopupMessage();
      });
  }

  getModelosVeiculo(currentElementIndex: number){
    let tipoVeiculoDesc = $("#tipoVeiculo"+currentElementIndex+" option:selected").text();
  	let tipoVeiculoVal = $( '#tipoVeiculo'+currentElementIndex ).val();
  	let marcaVeiculoVal = $( '#marcaVeiculo'+currentElementIndex ).val();
    let marcaVeiculoDesc = $("#marcaVeiculo"+currentElementIndex+" option:selected").text();

    if(tipoVeiculoVal === "" || marcaVeiculoVal === "") {
      return;
    }

	this.edatService.eDAT.outrosVeiculosDat[currentElementIndex].marcaVeiculo = marcaVeiculoDesc;

  this.popupController.showPopupMessage("Atenção!",
  'Carregando modelos.', false);
	this.veiculoService.getModelosVeiculo(tipoVeiculoDesc, marcaVeiculoVal).subscribe(
					  result => {
  						this.edatService.arraysModeloVeiculo[currentElementIndex] = result;
              this.popupController.hidePopupMessage();
					  }, //Bind to view
					  err => {
  						console.log(err);
  						this.popupController.hidePopupMessage();
					  });
  }

  setModeloVeiculo (currentElementIndex: number) {
    let modeloVeiculoDesc = $("#modeloVeiculo"+currentElementIndex+" option:selected").text();

  	this.edatService.eDAT.outrosVeiculosDat[currentElementIndex].modeloVeiculo = modeloVeiculoDesc;
  }

  getCEP(currentElementIndex: number) { //38411876
  	let cep = $( '#cep'+currentElementIndex ).val();

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
						  this.edatService.eDAT.outrosVeiculosDat[currentElementIndex].logradouro = result[0];
						}
            this.popupController.hidePopupMessage();
					  }, //Bind to view
					  err => {
						console.log(err);
            this.popupController.hidePopupMessage();
					  });
  }
}
