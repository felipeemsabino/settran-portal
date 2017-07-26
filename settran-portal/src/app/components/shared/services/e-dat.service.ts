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
			"dataAcidente": "10/10/2018",
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
		"dataValidadeCNH": "11/11/2018",
		"categoriaCnh": "",
		"sexo": "",
		"nomeMunicipe": "Felipe Sabino",
		"dataNascimento": "30/03/1987",
		"cpf": "07046919658",
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
		"testemunhasDat": [{
            "nomeTestemunha": "Testemonies",
            "dataNascimento": "16/07/2017",
            "rg": "222222222222",
            "orgaoExpedidor": "SSP-MG"
        }],
		"fotosDat": [
			{
				"descricaoFoto": "",
				"urlFoto": ""
			},
			{
				"descricaoFoto": "",
				"urlFoto": ""
			},
			{
				"descricaoFoto": "",
				"urlFoto": ""
			},
			{
				"descricaoFoto": "",
				"urlFoto": ""
			},
			{
				"descricaoFoto": "",
				"urlFoto": ""
			}
		],
		"docPropietario": "",
		"nomePropietario": "",
		"enviouSms": "N",
		"numeroEnvioSms": "",
		"emailEnviaConfirmacao": "felipeems87@gmail.com",
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
}