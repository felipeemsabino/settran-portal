import { Component, OnInit } from '@angular/core';
import { EDATService } from '../../../shared/services/e-dat.service';

@Component({
  selector: 'app-outros-veiculos',
  templateUrl: './outros-veiculos.component.html',
  styleUrls: ['./outros-veiculos.component.css']
})
export class OutrosVeiculosComponent implements OnInit {

  veiculos: any[] = new Array();
  
  constructor(private edatService: EDATService) { }

  ngOnInit() {
  }

  removerVeiculo(index: number) {
    this.edatService.eDAT.outrosVeiculosDat.splice(index, 1);
  }
  
  adicionaVeiculo() {
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
}
