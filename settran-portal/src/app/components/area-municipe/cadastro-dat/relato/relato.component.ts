import { Component, OnInit } from '@angular/core';
import { EDATService } from '../../../shared/services/e-dat.service';

declare var $:any; // JQUERY

@Component({
  selector: 'app-relato',
  templateUrl: './relato.component.html',
  styleUrls: ['./relato.component.css']
})
export class RelatoComponent implements OnInit {

  constructor(public edatService: EDATService) { }

  url = "http://ec2-52-67-135-39.sa-east-1.compute.amazonaws.com:8080/img/";
  ngOnInit() {

  }

  insereTextoPadrao() {
    this.edatService.relatoAux = "";

    if(this.edatService.eDAT.isPropietario == 'N' && this.edatService.eDAT.outrosVeiculosDat.length == 0) {
      this.edatService.relatoAux = this.edatService.textosPadrao.padrao1;
    } else if(this.edatService.eDAT.isPropietario == 'S' && this.edatService.eDAT.outrosVeiculosDat.length == 0) {
      this.edatService.relatoAux = this.edatService.textosPadrao.padrao2;
    } else if(this.edatService.eDAT.isPropietario == 'N' && this.edatService.eDAT.outrosVeiculosDat.length >= 1) {
      this.edatService.relatoAux = this.edatService.textosPadrao.padrao3;
    } else if(this.edatService.eDAT.isPropietario == 'S' && this.edatService.eDAT.outrosVeiculosDat.length >= 1) {
      this.edatService.relatoAux = this.edatService.textosPadrao.padrao4;
    }

    this.edatService.relatoAux = this.edatService.relatoAux.replace(
      "<< data do acidente>>", this.edatService.eDAT.acidenteDat[0].dataAcidente);

    this.edatService.relatoAux = this.edatService.relatoAux.replace(
      "<<hora do acidente>>", this.edatService.eDAT.acidenteDat[0].horaAcidente);

    this.edatService.relatoAux = this.edatService.relatoAux.replace(
      "<< endereço do acidente(tipologradouro, logradouro, n°, bairro, zona)>>", this.formataEnderecoAcidente());

    this.edatService.relatoAux = this.edatService.relatoAux.replace(
      ", cruzamento com <<caso haja cruzamento, endereço do cruzamento(tipologradouro, logradouro, n°)>>", this.formataEnderecoCruzamentoAcidente());

    this.edatService.relatoAux = this.edatService.relatoAux.replace(
      "<< marca/modelo>>", this.edatService.eDAT.marcaVeiculo+"/"+this.edatService.eDAT.modeloVeiculo);

    this.edatService.relatoAux = this.edatService.relatoAux.replace(
      "<< placa>>", this.edatService.eDAT.placa);

    this.edatService.relatoAux = this.edatService.relatoAux.replace(
      "<< nomeSolicitante>>", this.edatService.eDAT.nomeMunicipe);

    this.edatService.relatoAux = this.edatService.relatoAux.replace(
      "<< cpf solicitante>>", this.edatService.eDAT.cpf);

    this.edatService.relatoAux = this.edatService.relatoAux.replace(
      "<<tipoacidente>>", this.edatService.eDAT.acidenteDat[0].tipoAcidente);

    this.edatService.relatoAux += this.formataOutrosEnvolvidos();

      if(!this.edatService.relatoAux.endsWith(".")) {
        this.edatService.relatoAux += ".";
      }
  }

  formataEnderecoAcidente() {
    let endereco = this.edatService.eDAT.acidenteDat[0].logradouro.tipoLogradouro + " " +
				   this.edatService.eDAT.acidenteDat[0].logradouro.nomeLogradouro;

  	if (this.edatService.eDAT.acidenteDat[0].numeroEndereco != "") {
  	  endereco += " "+this.edatService.eDAT.acidenteDat[0].numeroEndereco;
  	}

  	endereco += " "+this.edatService.eDAT.acidenteDat[0].logradouro.nomeBairro +
    (this.edatService.eDAT.acidenteDat[0].zona.length > 0 ?
    " zona "+this.edatService.eDAT.acidenteDat[0].zona.toLowerCase() : '');

  	return endereco;
  }

  formataEnderecoCruzamentoAcidente() {
	let enderecoCruzamento = "";
	if(!this.edatService.eDAT.acidenteDat[0].logradouroCruzamento.id || this.edatService.eDAT.acidenteDat[0].logradouroCruzamento.id == "") {
		return enderecoCruzamento;
	}

	enderecoCruzamento = ", cruzamento com "+this.edatService.eDAT.acidenteDat[0].logradouroCruzamento.tipoLogradouro + " " +
				   this.edatService.eDAT.acidenteDat[0].logradouroCruzamento.nomeLogradouro;

	if (this.edatService.eDAT.acidenteDat[0].numeroEndereco != "") {
	  enderecoCruzamento += " "+this.edatService.eDAT.acidenteDat[0].numeroLogradouroAcidenteCruzamento;
	}

	enderecoCruzamento += " "+this.edatService.eDAT.acidenteDat[0].logradouroCruzamento.nomeBairro +
  (this.edatService.eDAT.acidenteDat[0].zona.length > 0 ?
  " zona "+this.edatService.eDAT.acidenteDat[0].zona.toLowerCase() :
  '');

	return enderecoCruzamento;
  }

  formataOutrosEnvolvidos() {
    if(this.edatService.eDAT.outrosVeiculosDat.length == 0)
		return "";

	let outrosEnvolvidosTexto = " Foi envolvido ainda";
	let index = 0;

	for(let veiculo of this.edatService.eDAT.outrosVeiculosDat) {
		if(index > 0) {
			outrosEnvolvidosTexto += ",";
		}
		outrosEnvolvidosTexto += " o veículo " + veiculo.marcaVeiculo + "/" + veiculo.modeloVeiculo + " de placa " + veiculo.placa +
		", conduzido por " + veiculo.nomeCondutorOutroVeiculo + (veiculo.cpf == '' ? " < CPF não informado >" : ", CPF " + veiculo.cpf);
		index++;
	}

	return outrosEnvolvidosTexto;
  }

  changeListener($event, index) : void {
    this.readThis($event.target, index);
  }

  readThis(inputValue: any, index: number): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();

    myReader.onloadend = (e) => {
       this.edatService.eDAT.fotosDat[index].decodeImagem = myReader.result;
       this.edatService.eDAT.fotosDat[index].urlFoto = $('#foto'+index).val().split('\\')[$('#foto'+index).val().split('\\').length-1];

    }
    myReader.readAsDataURL(file);
  }

  removerFoto(index: number) {
    this.edatService.eDAT.fotosDat[index].decodeImagem = "";
    this.edatService.eDAT.fotosDat[index].urlFoto = "";
    this.edatService.eDAT.fotosDat[index].descricaoFoto = "";
  }

}
