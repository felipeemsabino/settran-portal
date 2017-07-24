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
  
  constructor() {
    this.eDAT = {
		"isPropietario" : "",
		"renavam": "",
		"placa": "",
		"marcaVeiculo": "",
		"modeloVeiculo": "",
		"chassi": "",
		"tipoVeiculo": {
			"id": 1
		},
		"acidenteDat": [{
			"tipoAcidente": "",
			"dataAcidente": "",
			"horaAcidente": "",
			"zona": "",
			"logradouro":{},
			"numeroEndereco": "",
			"logradouroCruzamento": {}
		}],
		"relatoDat":[ {
			"descricaoRelatoAcidente": "OLHAR REGRA PARA TEXTO NO DOCUMENTO"
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
		"ipRequisicao": "192.168.0.122",
		"codigoConfirmacaoDat": "012943",
		"outrosVeiculosDat": [],
		"testemunhasDat": [
			{
				"nomeTestemunha": "Testemonies",
				"dataNascimento": "16/07/2017",
				"rg": "222222222222",
				"orgaoExpedidor": "SSP-MG"
			}
		],
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