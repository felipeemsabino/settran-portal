import { Injectable } from '@angular/core';

@Injectable()
export class EDATService {

  public eDAT: any;
  public resultadoPerguntas: any[] = new Array();
  public perguntas: any[] = new Array();
  public respostasInvalidas: any[] = new Array();
  
  tiposVeiculo: any[] = new Array();
  
  /*Aba seus veiculos*/
  seuVeiculoMarcas: any[];
  seuVeiculoModelos: any[];
  
  /*Aba outros envolvidos*/
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
		"isPropietario" : "",
		"renavam": "",
		"placa": "",
		"marcaVeiculo": "",
		"modeloVeiculo": "",
		"chassi": "",
		"tipoVeiculo": {
			"id": ""
		},
		"acidenteDat": [{
			"tipoAcidente": "",
			"dataAcidente": "",
			"horaAcidente": "",
			"zona": "",
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
			"logradouroCruzamento": {
				"id":"1083373",
				"nomeLogradouro":"",
				"tipoLogradouro":"",
				"nomeBairro":"",
				"cep":"",
				"nomeCidade":"",
				"uf":""
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
		"nomeMunicipe": "",
		"dataNascimento": "",
		"cpf": "",
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
		"ipRequisicao": "",
		"codigoConfirmacaoDat": "",
		"outrosVeiculosDat": [],
		"testemunhasDat": [],
		"fotosDat": [
			{
				"descricaoFoto": "",
				"urlFoto": ""
			}
		],
		"docPropietario": "",
		"nomePropietario": "",
		"enviouSms": "",
		"numeroEnvioSms": "",
		"emailEnviaConfirmacao": "",
		"confirmacaoDados": "",
		"temSeguro": ""
	}
  }
}