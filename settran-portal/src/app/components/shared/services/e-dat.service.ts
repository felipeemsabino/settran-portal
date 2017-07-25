import { Injectable } from '@angular/core';

@Injectable()
export class EDATService {

  public eDAT: any;
  public resultadoPerguntas: any[] = new Array();
  public perguntas: any[] = new Array();
  public respostasInvalidas: any[] = new Array();
  
  tiposVeiculo: any[] = new Array();
  
  arraysMarcasVeiculo: any[];
  arraysModeloVeiculo: any[];
  
  public textosPadrao: any = {
	  "padrao1":"Declaro para os fins de direito, advertido das penas de lei, na qualidade de Condutor, que na data de << data do acidente>>, às <<hora do acidente>>, no endereço << endereço do acidente(tipologradouro, logradouro, n°, bairro, zona)>>, cruzamento com <<caso haja cruzamento, endereço do cruzamento(tipologradouro, logradouro, n°)>>, UBERLANDIA-MG, o veículo << marca/modelo>> , placa << placa>> conduzido por mim, << nomeSolicitante>>, CPF << cpf solicitante>>, envolveu-se em um acidente sem vítima do tipo <<tipoacidente>>.",
	  "padrao2":"Declaro para os fins de direito, advertido das penas de lei, na qualidade de Condutor e proprietário, que na data de << data do acidente>>, às <<hora do acidente>>, no endereço << endereço do acidente(tipologradouro, logradouro, n°, bairro, zona)>>, cruzamento com <<caso haja cruzamento, endereço do cruzamento(tipologradouro, logradouro, n°)>>, UBERLANDIA-MG, o veículo << marca/modelo>> , placa << placa>> conduzido por mim, << nomeSolicitante>>, CPF << cpf solicitante>>, envolveu-se em um acidente sem vítima do tipo <<tipoacidente>>.",
	  "padrao3":"Declaro para os fins de direito, advertido das penas de lei, na qualidade de Condutor, que na data de << data do acidente>>, às <<hora do acidente>>, no endereço << endereço do acidente(tipologradouro, logradouro, n°, bairro, zona)>>, cruzamento com <<caso haja cruzamento, endereço do cruzamento(tipologradouro, logradouro, n°)>>, UBERLANDIA-MG, o veículo << marca/modelo>> , placa << placa>> conduzido por mim, << nomeSolicitante>>, CPF << cpf solicitante>>, envolveu-se em um acidente sem vítima do tipo <<tipoacidente>>.",
	  "padrao4":"Declaro para os fins de direito, advertido das penas de lei, na qualidade de Condutor e proprietário, que na data de << data do acidente>>, às <<hora do acidente>>, no endereço << endereço do acidente(tipologradouro, logradouro, n°, bairro, zona)>>, cruzamento com <<caso haja cruzamento, endereço do cruzamento(tipologradouro, logradouro, n°)>>, UBERLANDIA-MG, o veículo << marca/modelo>> , placa << placa>> conduzido por mim, << nomeSolicitante>>, CPF << cpf solicitante>>, envolveu-se em um acidente sem vítima do tipo <<tipoacidente>>."
  };
  
  constructor() {
    this.eDAT = {
		"isPropietario" : "S",
		"renavam": "",
		"placa": "HAX4735",
		"marcaVeiculo": "",
		"modeloVeiculo": "",
		"chassi": "",
		"tipoVeiculo": {
			"id": 1
		},
		"acidenteDat": [{
			"tipoAcidente": "Abalroamento",
			"dataAcidente": "16/07/2017",
			"horaAcidente": "09:00",
			"zona": "RURAL",
			"logradouro":{
				"id":"1083373",
				"nomeLogradouro":"xxxxxx",
				"tipoLogradouro":"Rua",
				"nomeBairro":"Manti",
				"cep":"31510300",
				"nomeCidade":"nomeCidade",
				"uf":"uf"
            },
			"numeroEndereco": "",
			"logradouroCruzamento": {
				"id":"1083373",
				"nomeLogradouro":"xxxxxx",
				"tipoLogradouro":"Rua",
				"nomeBairro":"Manti",
				"cep":"31510300",
				"nomeCidade":"nomeCidade",
				"uf":"uf"
			}
		}],
		"relatoDat":[ {
			"descricaoRelatoAcidente": ""
		}],
		"cor": "",
		"cnh": "",
		"dataValidadeCNH": "",
		"categoriaCnh": "",
		"sexo": "",
		"nomeMunicipe": "Felipe Eduardo Menezes Sabino",
		"dataNascimento": "",
		"cpf": "070.469.196-58",
		"rg": "",
		"orgaoExpedidor": "",
		"emailMunicipe": "",
		"logradouro":{
			"id":"",
			"nomeLogradouro":"",
			"tipoLogradouro":"",
			"nomeBairro":"",
			"cep":"",
			"nomeCidade":"",
			"uf":""
		},
		"numeroEndereco": "",
		"complementoEndereco": "",
		"telefone": "",
		"celular": "",
		"ipRequisicao": "192.168.0.122",
		"codigoConfirmacaoDat": "012943",
		"outrosVeiculosDat": [],
		"testemunhasDat": [],
		"fotosDat": [
			{
				"descricaoFoto": "Foto 1 acidente",
				"urlFoto": "11111111111111111Sun Jul 16 21:55:13 BRT 20171"
			}
		],
		"docPropietario": "",
		"nomePropietario": "",
		"enviouSms": "S",
		"numeroEnvioSms": "222222222222",
		"emailEnviaConfirmacao": "email@email.com",
		"confirmacaoDados": "S",
		"temSeguro":""
	}
  }
}