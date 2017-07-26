import { Component, OnInit } from '@angular/core';
import { EDATService } from '../../../shared/services/e-dat.service';
import { VeiculoService } from '../../../shared/services/veiculo.service';
import { EnderecoService } from '../../../shared/services/endereco.service';
import { URLSearchParams } from '@angular/http';

declare var $:any; // JQUERY

@Component({
  selector: 'app-outros-veiculos',
  templateUrl: './outros-veiculos.component.html',
  styleUrls: ['./outros-veiculos.component.css'],
  providers: [VeiculoService, EnderecoService]
})
export class OutrosVeiculosComponent implements OnInit {

  constructor(private veiculoService: VeiculoService, private enderecoService: EnderecoService, private edatService: EDATService) {}

  ngOnInit() {
    if(this.edatService.tiposVeiculo.length == 0) {
	  this.getTiposVeiculo();
	}
	
	if(!this.edatService.arraysMarcasVeiculo && !this.edatService.arraysModeloVeiculo) {
	  this.edatService.arraysMarcasVeiculo = new Array();
	  this.edatService.arraysModeloVeiculo = new Array();	
	}
	this.resetMasks();
  }
  
  setMasks() {
	$('.cep').mask('00000-000');
	$('.phone').mask('0000-0000');
    $('.phone_with_ddd').mask('(00) 00000-0000');
	$('.cpf').mask('000.000.000-00', {reverse: true});
  }
  
  resetMasks() {  
	setTimeout(function() {
		$('.cep').mask('00000-000');
		$('.phone_with_ddd').mask('(00) 00000-0000');
		$('.cpf').mask('000.000.000-00', {reverse: true});
	}, 500);
  }

  removerVeiculo(index: number) {
    this.edatService.eDAT.outrosVeiculosDat.splice(index, 1);
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
	
	$('.panel').on('shown.bs.collapse', function (e) {
	 self.setMasks();
	})
  }
  
  alteraPossuiSeguro(possuiSeguro: string, currentElementIndex: number) {
	this.edatService.eDAT.outrosVeiculosDat[currentElementIndex].temSeguro = possuiSeguro;
  }
  
  getTiposVeiculo() {
	
    this.veiculoService.getTiposVeiculo(new URLSearchParams())
                      .subscribe(
                          result => {
							this.edatService.tiposVeiculo = result;							
                          }, //Bind to view
                          err => {
                            console.log(err);						
							$('#loadingModal').modal('hide'); // fecha modal	
                          });
  }
  
  getMarcasVeiculo(currentElementIndex: number) {
    let tipoVeiculoDesc = $("#tipoVeiculo"+currentElementIndex+" option:selected").text();
	let tipoVeiculoVal = $( '#tipoVeiculo'+currentElementIndex ).val();
	
    if(tipoVeiculoVal === "") {
	  return;
	}
	
	this.edatService.eDAT.outrosVeiculosDat[currentElementIndex].tipoVeiculo.id = tipoVeiculoVal;
	
	$('#loadingModal').modal('show'); // abre loadingModal
	console.log('tipoVeiculoDesc -> '+tipoVeiculoDesc);
	this.veiculoService.getMarcasVeiculo(tipoVeiculoDesc)
				  .subscribe(
					  result => {
						this.edatService.arraysMarcasVeiculo[currentElementIndex] = result;
						this.edatService.arraysModeloVeiculo[currentElementIndex] = new Array();
						
						$('#loadingModal').modal('hide'); // fecha modal
					  }, //Bind to view
					  err => {
						console.log(err);						
						$('#loadingModal').modal('hide'); // fecha modal	
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
	
	$('#loadingModal').modal('show'); // abre loadingModal
	
	this.veiculoService.getModelosVeiculo(tipoVeiculoDesc, marcaVeiculoVal)
				  .subscribe(
					  result => {
						this.edatService.arraysModeloVeiculo[currentElementIndex] = result;
						
						$('#loadingModal').modal('hide'); // fecha modal		
					  }, //Bind to view
					  err => {
						console.log(err);						
						$('#loadingModal').modal('hide'); // fecha modal	
					  });
  }
  
  setModeloVeiculo (currentElementIndex: number) {
    let modeloVeiculoDesc = $("#modeloVeiculo"+currentElementIndex+" option:selected").text();
  
	this.edatService.eDAT.outrosVeiculosDat[currentElementIndex].modeloVeiculo = modeloVeiculoDesc;
	console.log(this.edatService.eDAT.outrosVeiculosDat[currentElementIndex]);
  }
  
  getCEP(currentElementIndex: number) { //38411876
	let cep = $( '#cep'+currentElementIndex ).val();
	
    if(cep === "") {
	  return;
	}
	
	let params: URLSearchParams = new URLSearchParams();
	params.set("cep", cep.replace(/\D/g,'')); // remove nao numericos
	
	$('#loadingModal').modal('show'); // abre loadingModal
	
	this.enderecoService.getCEP(params)
				  .subscribe(
					  result => {
						if(result.length > 0) {
						  this.edatService.eDAT.outrosVeiculosDat[currentElementIndex].logradouro = result[0];
						  console.log(this.edatService.eDAT.outrosVeiculosDat);
						}
						$('#loadingModal').modal('hide'); // fecha modal		
					  }, //Bind to view
					  err => {
						console.log(err);						
						$('#loadingModal').modal('hide'); // fecha modal	
					  });
  }
}
