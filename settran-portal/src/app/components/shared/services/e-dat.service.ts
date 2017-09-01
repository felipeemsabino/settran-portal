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
  public emailMunicipeConfirm: string = "";
  public validar: boolean = false;
  public edicaoDAT: boolean = false; // flag utilizada para validacao e revisao de dat, na validacao nao e permitido a edicao, ja na revisao e permitido a edicao
  public edicaoFotos: boolean = true;
  public relatoAux: string = "";

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

  limparDadosDAT() {
    /*this.eDAT = {
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
          "id":"",
          "nomeLogradouro":"",
          "tipoLogradouro":""
  			}, "numeroLogradouroAcidenteCruzamento":""
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
        {descricaoFoto: "", urlFoto: "", decodeImagem: ""},
        {descricaoFoto: "", urlFoto: "", decodeImagem: ""},
        {descricaoFoto: "", urlFoto: "", decodeImagem: ""},
        {descricaoFoto: "", urlFoto: "", decodeImagem: ""},
        {descricaoFoto: "", urlFoto: "", decodeImagem: ""}
  		],
  		"docPropietario": "",
  		"nomePropietario": "",
  		"enviouSms": "",
  		"numeroEnvioSms": "",
  		"emailEnviaConfirmacao": "",
  		"confirmacaoDados": "",
  		"temSeguro": ""
  	}*/
      this.eDAT = {
  		"isPropietario" : "S",
  		"renavam": "12313",
  		"placa": "hax3321",
  		"marcaVeiculo": "",
  		"modeloVeiculo": "",
  		"chassi": "12321323112",
  		"tipoVeiculo": {
  			"id": ""
  		},
  		"acidenteDat": [{
  			"tipoAcidente": "",
  			"dataAcidente": "15/08/2017",
  			"horaAcidente": "",
  			"zona": "",
  			"logradouro":{
              },
  			"numeroEndereco": "",
  			"logradouroCruzamento": {
            "id":"",
            "nomeLogradouro":"",
            "tipoLogradouro":""
  			},
        "numeroLogradouroAcidenteCruzamento":""
  		}],
  		"relatoDat":[ {
  			"descricaoRelatoAcidente": ""
  		}],
  		"cor": "asdas",
  		"cnh": "2312321312",
  		"dataValidadeCNH": "10/11/2019",
  		"categoriaCnh": "A",
  		"sexo": "M",
  		"nomeMunicipe": "Felipe Eduardo Menezes Sabino",
  		"dataNascimento": "30/03/1987",
  		"cpf": "07046919658",
  		"rg": "13243028",
  		"orgaoExpedidor": "sspmmg",
  		"emailMunicipe": "felipeems87@gmail.com",
  		"logradouro":{
  			"id":"",
  			"nomeLogradouro":"",
  			"tipoLogradouro":"",
  			"nomeBairro":"",
  			"cep":"38400230",
  			"nomeCidade":"",
  			"uf":""
  		},
  		"numeroEndereco": "212",
  		"complementoEndereco": "",
  		"telefone": "11111111",
  		"celular": "111111111",
  		"ipRequisicao": "",
  		"codigoConfirmacaoDat": "",
  		"outrosVeiculosDat": [],
  		"testemunhasDat": [],
  		"fotosDat": [
        {descricaoFoto: "asd 1", urlFoto: "", decodeImagem: ""},
        {descricaoFoto: "asd 2", urlFoto: "", decodeImagem: ""},
        {descricaoFoto: "asd 3", urlFoto: "", decodeImagem: ""},
        {descricaoFoto: "asd 4", urlFoto: "", decodeImagem: ""},
        {descricaoFoto: "asd 5", urlFoto: "", decodeImagem: ""}
  		],
  		"docPropietario": "12",
  		"nomePropietario": "Felipe",
  		"enviouSms": "",
  		"numeroEnvioSms": "",
  		"emailEnviaConfirmacao": "felipeems87@gmail.com",
  		"confirmacaoDados": "S",
  		"temSeguro": "S"
  	}
  }
  cancelarEDAT() {
    this.limparDadosDAT();
  }

  constructor(private http: Http) {
    this.limparDadosDAT();
  }

  enviarEDAT() {
    let header = new Headers();
  	header.append('Content-Type', 'application/json');
  	header.append('authorization', 'e96b4ae0-e36a-648f-134f-44171c2dcb18');
    let options = new RequestOptions({ headers: header });

    return this.http.post('http://ec2-52-67-135-39.sa-east-1.compute.amazonaws.com:8080/wsedat/rest/edat/cadastrardat/',
							this.eDAT, options)
                     .map((res:Response) =>this.extractData(res))
                     .catch((error: any) => {
                       if(error.status == 400){
                         return [error];
                       } else {
                        return Observable.arguments(new Error(error));
                       }
                    });
  }

  extractData(res: Response) {
    return res.json();
  }

  /* Limpa máscaras de CPF e padroniza mascara de telefone */
  alteraFormatoPadraoData() {
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
  alteraFormatoInputData() {
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

  limparDados() {
    //this.emailMunicipeConfirm = "";
    this.edicaoDAT = false;
    this.edicaoFotos = true;
  }

  habilitarEdicaoCampos() {
    this.edicaoDAT = true;
  }

  desabilitarEdicaoCampos() {
    this.edicaoDAT = false;
  }

  // limpa atributos vazios do json edat
    limpaAtributosBranco () {
      if(this.eDAT.acidenteDat[0].logradouroCruzamento && !this.eDAT.acidenteDat[0].logradouroCruzamento.id) {
        delete this.eDAT.acidenteDat[0].logradouroCruzamento;
      }

      let cont = 0;
      if(this.eDAT.fotosDat) {
        if(this.eDAT.fotosDat[cont]) {
          if(this.eDAT.fotosDat[cont].decodeImagem && this.eDAT.fotosDat[cont].decodeImagem.length == 0) {
            this.eDAT.fotosDat.splice(cont, 1);
          } else cont++;
        }
        if(this.eDAT.fotosDat[cont]) {
          if(this.eDAT.fotosDat[cont].decodeImagem && this.eDAT.fotosDat[cont].decodeImagem.length == 0) {
            this.eDAT.fotosDat.splice(cont, 1);
          }else cont++;
        }
        if(this.eDAT.fotosDat[cont]) {
          if(this.eDAT.fotosDat[cont].decodeImagem && this.eDAT.fotosDat[cont].decodeImagem.length == 0) {
            this.eDAT.fotosDat.splice(cont, 1);
          }else cont++;
        }
        if(this.eDAT.fotosDat[cont]) {
          if(this.eDAT.fotosDat[cont].decodeImagem && this.eDAT.fotosDat[cont].decodeImagem.length == 0) {
            this.eDAT.fotosDat.splice(cont, 1);
          }else cont++;
        }
        if(this.eDAT.fotosDat[cont]) {
          if(this.eDAT.fotosDat[cont].decodeImagem && this.eDAT.fotosDat[cont].decodeImagem.length == 0) {
            this.eDAT.fotosDat.splice(cont, 1);
          }
        }
      }
    }

    // limpa atributos vazios do json edat
    setAtributosBrancos () {
      if(!this.eDAT.acidenteDat[0].logradouroCruzamento) {
        this.eDAT.acidenteDat[0].logradouroCruzamento = {
          "id":"",
          "nomeLogradouro":"",
          "tipoLogradouro":""
        };
      }
      let cont = 0;
      if(this.eDAT.fotosDat) {
        cont = 4 - this.eDAT.fotosDat.length;
      }
      for(let index = 0;index <= cont;index++) {
        this.eDAT.fotosDat.push({descricaoFoto: "", urlFoto: "", decodeImagem: ""});
      }
    }

    // limpa a resposta do usuario de perg preliminares
    resetInfosUsuario () {
      for (let pergunta of this.perguntas) {
        pergunta.resposta = '';
      }
      this.emailMunicipeConfirm = '';
      this.relatoAux = '';
    }

    removeMascaraCPF() {
      this.eDAT.cpf = this.limpaMascaraCPF(this.eDAT.cpf);

      for (let veiculo of this.eDAT.outrosVeiculosDat) {
        if(veiculo.cpf)
          veiculo.cpf = this.limpaMascaraCPF(veiculo.cpf);
      }
    }

    limpaMascaraCPF(cpf: string) {
      return cpf.replace(/\D/g,'');
    }
}
