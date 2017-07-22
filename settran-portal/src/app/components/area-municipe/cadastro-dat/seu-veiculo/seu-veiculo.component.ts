import { Component, OnInit, Input } from '@angular/core';
import { EDATService } from '../../../shared/services/e-dat.service';
import { VeiculoService } from '../../../shared/services/veiculo.service';
import { EnderecoService } from '../../../shared/services/endereco.service';
import { URLSearchParams } from '@angular/http';

declare var $:any; // JQUERY

@Component({
  selector: 'app-seu-veiculo',
  templateUrl: './seu-veiculo.component.html',
  styleUrls: ['./seu-veiculo.component.css'],
  providers: [VeiculoService, EnderecoService]
})
export class SeuVeiculoComponent implements OnInit {

  marcasVeiculo: any[];
  modelosVeiculo: any[];
  
  constructor(private edatService: EDATService, private veiculoService: VeiculoService, private enderecoService: EnderecoService) { 
  }

  ngOnInit() {
    if(this.edatService.tiposVeiculo.length == 0) {
	  this.getTiposVeiculo();
	}
    this.setMasks();
  }
  
  setMasks() {
	$('.cep').mask('00000-000');
	$('.phone').mask('0000-0000');
    $('.phone_with_ddd').mask('(00) 00000-0000');
	$('.cpf').mask('000.000.000-00', {reverse: true});
  }
  
  resetCPFMask() {  
	setTimeout(function() {
		$('#docProprietario').unmask().mask('000.000.000-00', {reverse: true});
	}, 1000);
  }
  
  alteraPossuiSeguro(possuiSeguro: string) {
	this.edatService.eDAT.temSeguro = possuiSeguro;
  }
  
  alteraSexo(sexo: string) {
	this.edatService.eDAT.sexo = sexo;
  }
  
  setDadosProprietario() {
    this.edatService.eDAT.nomePropietario = this.edatService.eDAT.nomeMunicipe;
	console.log(this.edatService.eDAT.cpf);
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
	
	$('#loadingModal').modal('show'); // abre loadingModal
	
	this.veiculoService.getMarcasVeiculo(tipoVeiculoDesc)
				  .subscribe(
					  result => {
						this.marcasVeiculo = result;
						this.modelosVeiculo = new Array();
						
						$('#loadingModal').modal('hide'); // fecha modal
					  }, //Bind to view
					  err => {
						console.log(err);
					  });
  }
  
  getModelosVeiculo(){
    let tipoVeiculoDesc = $("#tipoVeiculo option:selected").text();
	let tipoVeiculoVal = $( '#tipoVeiculo' ).val();
	let marcaVeiculoVal = $( '#marcaVeiculo' ).val();
	
    if(tipoVeiculoVal === "" || marcaVeiculoVal === "") {
	  return;
	}
	
	this.edatService.eDAT.marcaVeiculo = tipoVeiculoDesc;
	
	$('#loadingModal').modal('show'); // abre loadingModal
	
	this.veiculoService.getModelosVeiculo(tipoVeiculoDesc, marcaVeiculoVal)
				  .subscribe(
					  result => {
						this.modelosVeiculo = result;
						
						$('#loadingModal').modal('hide'); // fecha modal		
					  }, //Bind to view
					  err => {
						console.log(err);
					  });
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
	
	$('#loadingModal').modal('show'); // abre loadingModal
	
	this.enderecoService.getCEP(params)
				  .subscribe(
					  result => {
						if(result.length > 0) {
						  this.edatService.eDAT.logradouro = result[0];
						  console.log(this.edatService.eDAT);
						}
						$('#loadingModal').modal('hide'); // fecha modal		
					  }, //Bind to view
					  err => {
						console.log(err);
					  });
  }

}
