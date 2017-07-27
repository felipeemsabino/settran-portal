import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

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
  
  /*Aba confirmação dat*/
  codigoVerificado: string;
  
  public textosPadrao: any = {
	  "padrao1":"Declaro para os fins de direito, advertido das penas de lei, na qualidade de Condutor, que na data de << data do acidente>>, às <<hora do acidente>>, no endereço << endereço do acidente(tipologradouro, logradouro, n°, bairro, zona)>>, cruzamento com <<caso haja cruzamento, endereço do cruzamento(tipologradouro, logradouro, n°)>>, UBERLANDIA-MG, o veículo << marca/modelo>> , placa << placa>> conduzido por mim, << nomeSolicitante>>, CPF << cpf solicitante>>, envolveu-se em um acidente sem vítima do tipo <<tipoacidente>>.",
	  "padrao2":"Declaro para os fins de direito, advertido das penas de lei, na qualidade de Condutor e proprietário, que na data de << data do acidente>>, às <<hora do acidente>>, no endereço << endereço do acidente(tipologradouro, logradouro, n°, bairro, zona)>>, cruzamento com <<caso haja cruzamento, endereço do cruzamento(tipologradouro, logradouro, n°)>>, UBERLANDIA-MG, o veículo << marca/modelo>> , placa << placa>> conduzido por mim, << nomeSolicitante>>, CPF << cpf solicitante>>, envolveu-se em um acidente sem vítima do tipo <<tipoacidente>>.",
	  "padrao3":"Declaro para os fins de direito, advertido das penas de lei, na qualidade de Condutor, que na data de << data do acidente>>, às <<hora do acidente>>, no endereço << endereço do acidente(tipologradouro, logradouro, n°, bairro, zona)>>, cruzamento com <<caso haja cruzamento, endereço do cruzamento(tipologradouro, logradouro, n°)>>, UBERLANDIA-MG, o veículo << marca/modelo>> , placa << placa>> conduzido por mim, << nomeSolicitante>>, CPF << cpf solicitante>>, envolveu-se em um acidente sem vítima do tipo <<tipoacidente>>.",
	  "padrao4":"Declaro para os fins de direito, advertido das penas de lei, na qualidade de Condutor e proprietário, que na data de << data do acidente>>, às <<hora do acidente>>, no endereço << endereço do acidente(tipologradouro, logradouro, n°, bairro, zona)>>, cruzamento com <<caso haja cruzamento, endereço do cruzamento(tipologradouro, logradouro, n°)>>, UBERLANDIA-MG, o veículo << marca/modelo>> , placa << placa>> conduzido por mim, << nomeSolicitante>>, CPF << cpf solicitante>>, envolveu-se em um acidente sem vítima do tipo <<tipoacidente>>."
  };

  constructor(private http: Http) {
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
            },
			"numeroEndereco": "",
			"logradouroCruzamento": {
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
				"urlFoto": "",
				"decodeImagem":""
			},
			{
				"descricaoFoto": "",
				"urlFoto": "",
				"decodeImagem":""
			},
			{
				"descricaoFoto": "",
				"urlFoto": "",
				"decodeImagem":""
			},
			{
				"descricaoFoto": "",
				"urlFoto": "",
				"decodeImagem":""
			},
			{
				"descricaoFoto": "",
				"urlFoto": "",
				"decodeImagem":""
			}
		],
		"docPropietario": "",
		"nomePropietario": "",
		"enviouSms": "S",
		"numeroEnvioSms": "",
		"emailEnviaConfirmacao": "",
		"confirmacaoDados": "N",
		"temSeguro": ""
	}
  }
  
  enviarEDAT() {
    let header = new Headers();
	header.append('Content-Type', 'application/json');
	header.append('authorization', 'e96b4ae0-e36a-648f-134f-44171c2dcb18');
    let options = new RequestOptions({ headers: header });

    return this.http.post('http://ec2-52-67-135-39.sa-east-1.compute.amazonaws.com:8080/wsedat/rest/edat/cadastrardat/',
							this.eDAT, options)
                     .map((res:Response) =>this.extractData(res))
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  extractData(res: Response) {
    return res.json();
  }
  
  /* Limpa máscaras de CPF e padroniza mascara de telefone */
  limpaMascaras() {
	this.eDAT.cpf = this.eDAT.cpf.replace(/\D/g,'');
	let date: string;
	
	if(this.eDAT.acidenteDat[0].dataAcidente) {
		date = this.eDAT.acidenteDat[0].dataAcidente.split("-");
		this.eDAT.acidenteDat[0].dataAcidente = date[2]+"/"+date[1]+"/"+date[0];
	}
	
	if(this.eDAT.dataValidadeCNH) {
		date = this.eDAT.dataValidadeCNH.split("-");
		this.eDAT.dataValidadeCNH = date[2]+"/"+date[1]+"/"+date[0];
	}
	
	if(this.eDAT.dataNascimento) {
		date = this.eDAT.dataNascimento.split("-");
		this.eDAT.dataNascimento = date[2]+"/"+date[1]+"/"+date[0];
	}
	
	for (let testemunha of this.eDAT.testemunhasDat) {
		date = testemunha.dataNascimento.split("-");
		testemunha.dataNascimento = date[2]+"/"+date[1]+"/"+date[0];
	}
  }  
  
  /* Atualiza as datas para o padrao do type date */
  reverteMascarasData() {
	let date: string;
	
	if(this.eDAT.acidenteDat[0].dataAcidente) {
		date = this.eDAT.acidenteDat[0].dataAcidente.split("/");
		this.eDAT.acidenteDat[0].dataAcidente = date[2]+"-"+date[1]+"-"+date[0];
	}
	
	if(this.eDAT.dataValidadeCNH) {
		date = this.eDAT.dataValidadeCNH.split("/");
		this.eDAT.dataValidadeCNH = date[2]+"-"+date[1]+"-"+date[0];
	}
	
	if(this.eDAT.dataNascimento) {
		date = this.eDAT.dataNascimento.split("/");
		this.eDAT.dataNascimento = date[2]+"-"+date[1]+"-"+date[0];
	}
	
	for (let testemunha of this.eDAT.testemunhasDat) {
		date = testemunha.dataNascimento.split("/");
		testemunha.dataNascimento = date[2]+"-"+date[1]+"-"+date[0];
	}
  }
}