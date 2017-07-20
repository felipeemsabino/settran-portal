import { Injectable } from '@angular/core';

@Injectable()
export class EDATService {

  public eDAT: any;
  public resultadoPerguntas: any[] = new Array();
  public perguntas: any[] = new Array();
  public respostasInvalidas: any[] = new Array();
  
  constructor() {
    this.eDAT = {
		"isPropietario" : "S",
		"renavam": "999999999",
		"placa": "PWE 8745",
		"marcaVeiculo": "Fiat",
		"modeloVeiculo": "Novo UNO",
		"chassi": "222222222222222222222222",
		"tipoVeiculo": {
			"id": 1
		},
		"acidenteDat": [{
			"tipoAcidente": "Abalroamento",
			"dataAcidente": "16/07/2017",
			"horaAcidente": "09:00",
			"zona": "RURAL",
			"logradouro":{"id":"1","nomeLogradouro":"xxxxxx","tipoLogradouro":"Rua","nomeBairro":"Manti","cep":"31510300",
				"nomeCidade":"nomeCidade","uf":"uf"
				},
			"numeroEndereco": "30B",
			"logradouroCruzamento": {"id":"1","nomeLogradouro":"xxxxxx","tipoLogradouro":"Rua","nomeBairro":"Manti","cep":"31510300",
				"nomeCidade":"nomeCidade","uf":"uf"
				}
		}],
		"relatoDat":[ {
			"descricaoRelatoAcidente": "OLHAR REGRA PARA TEXTO NO DOCUMENTO"
		}],
		"cor": "1111111111",
		"cnh": "11111111111111",
		"dataValidadeCNH": "16/07/2017",
		"categoriaCnh": "A",
		"sexo": "M",
		"nomeMunicipe": "Nadal",
		"dataNascimento": "16/07/2017",
		"cpf": "06328648693",
		"rg": "11111111111111111",
		"orgaoExpedidor": "ssp-mg",
		"emailMunicipe": "wwwwww@sssss.com.br",
		"logradouro":{
			"id":"1",
			"nomeLogradouro":"xxxxxx",
			"tipoLogradouro":"Rua",
			"nomeBairro":"Manti",
			"cep":"31510300",
			"nomeCidade":"nomeCidade",
			"uf":"uf"
		},
		"numeroEndereco": "21221",
		"complementoEndereco": "apartamento",
		"telefone": "313131313113",
		"celular": "3131313131",
		"ipRequisicao": "192.168.0.122",
		"codigoConfirmacaoDat": "012943",
		"outrosVeiculosDat": [
			{
				"placa": "PWE 8745",
				"marcaVeiculo": "Fiat",
				"modeloVeiculo": "Novo UNO",
				"tipoVeiculo": {
					"id": 1
				},
				"temSeguro":"S",
				"cnh": "11111111111111",
				"cpf": "06328648693",
				"rg": "11111111111111111",
				"orgaoExpedidor": "ssp-mg",
				"nomeCondutorOutroVeiculo": "Nadal",
				"logradouro":{"id":"1","nomeLogradouro":"xxxxxx","tipoLogradouro":"Rua","nomeBairro":"Manti","cep":"31510300",
				"nomeCidade":"nomeCidade","uf":"uf"
				},
				"complementoEndereco": "apartamento",
				"telefone": "3131313131"
			}
		],
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
		"docPropietario": "XXXXXXX",
		"nomePropietario": "Roberto",
		"enviouSms": "S",
		"numeroEnvioSms": "222222222222",
		"emailEnviaConfirmacao": "email@email.com",
		"confirmacaoDados": "S",
		"temSeguro":"S"
	}
}