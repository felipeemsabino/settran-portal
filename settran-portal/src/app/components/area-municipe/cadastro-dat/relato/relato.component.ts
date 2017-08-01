import { Component, OnInit } from '@angular/core';
import { EDATService } from '../../../shared/services/e-dat.service';

@Component({
  selector: 'app-relato',
  templateUrl: './relato.component.html',
  styleUrls: ['./relato.component.css']
})
export class RelatoComponent implements OnInit {
  
  constructor(public edatService: EDATService) { }
  
  ngOnInit() {

    if(this.edatService.eDAT.isPropietario == 'N' && this.edatService.eDAT.outrosVeiculosDat.length == 0) {
	  this.edatService.eDAT.relatoDat[0].descricaoRelatoAcidente = this.edatService.textosPadrao.padrao1;
	} else if(this.edatService.eDAT.isPropietario == 'S' && this.edatService.eDAT.outrosVeiculosDat.length == 0) {
	  this.edatService.eDAT.relatoDat[0].descricaoRelatoAcidente = this.edatService.textosPadrao.padrao2;
	} else if(this.edatService.eDAT.isPropietario == 'N' && this.edatService.eDAT.outrosVeiculosDat.length >= 1) {
	  this.edatService.eDAT.relatoDat[0].descricaoRelatoAcidente = this.edatService.textosPadrao.padrao3;
	} else if(this.edatService.eDAT.isPropietario == 'S' && this.edatService.eDAT.outrosVeiculosDat.length >= 1) {
	  this.edatService.eDAT.relatoDat[0].descricaoRelatoAcidente = this.edatService.textosPadrao.padrao4;
	}
	
	this.edatService.eDAT.relatoDat[0].descricaoRelatoAcidente = this.edatService.eDAT.relatoDat[0].descricaoRelatoAcidente.replace(
		"<< data do acidente>>", this.edatService.eDAT.acidenteDat[0].dataAcidente);
		
	this.edatService.eDAT.relatoDat[0].descricaoRelatoAcidente = this.edatService.eDAT.relatoDat[0].descricaoRelatoAcidente.replace(
		"<<hora do acidente>>", this.edatService.eDAT.acidenteDat[0].horaAcidente);
		
	this.edatService.eDAT.relatoDat[0].descricaoRelatoAcidente = this.edatService.eDAT.relatoDat[0].descricaoRelatoAcidente.replace(
		"<< endereço do acidente(tipologradouro, logradouro, n°, bairro, zona)>>", this.formataEnderecoAcidente());
		
	this.edatService.eDAT.relatoDat[0].descricaoRelatoAcidente = this.edatService.eDAT.relatoDat[0].descricaoRelatoAcidente.replace(
		", cruzamento com <<caso haja cruzamento, endereço do cruzamento(tipologradouro, logradouro, n°)>>", this.formataEnderecoCruzamentoAcidente());
		
	this.edatService.eDAT.relatoDat[0].descricaoRelatoAcidente = this.edatService.eDAT.relatoDat[0].descricaoRelatoAcidente.replace(
		"<< marca/modelo>>", this.edatService.eDAT.marcaVeiculo+"/"+this.edatService.eDAT.modeloVeiculo);
		
	this.edatService.eDAT.relatoDat[0].descricaoRelatoAcidente = this.edatService.eDAT.relatoDat[0].descricaoRelatoAcidente.replace(
		"<< placa>>", this.edatService.eDAT.placa);
		
	this.edatService.eDAT.relatoDat[0].descricaoRelatoAcidente = this.edatService.eDAT.relatoDat[0].descricaoRelatoAcidente.replace(
		"<< nomeSolicitante>>", this.edatService.eDAT.nomeMunicipe);
		
	this.edatService.eDAT.relatoDat[0].descricaoRelatoAcidente = this.edatService.eDAT.relatoDat[0].descricaoRelatoAcidente.replace(
		"<< cpf solicitante>>", this.edatService.eDAT.cpf);
		
	this.edatService.eDAT.relatoDat[0].descricaoRelatoAcidente = this.edatService.eDAT.relatoDat[0].descricaoRelatoAcidente.replace(
		"<<tipoacidente>>", this.edatService.eDAT.acidenteDat[0].tipoAcidente);
	
	this.edatService.eDAT.relatoDat[0].descricaoRelatoAcidente += this.formataOutrosEnvolvidos()+".";
  }
  
  formataEnderecoAcidente() {
    let endereco = this.edatService.eDAT.acidenteDat[0].logradouro.tipoLogradouro + " " +
				   this.edatService.eDAT.acidenteDat[0].logradouro.nomeLogradouro;
	
	if (this.edatService.eDAT.acidenteDat[0].numeroEndereco != "") {
	  endereco += " "+this.edatService.eDAT.acidenteDat[0].numeroEndereco;
	}
	
	endereco += " "+this.edatService.eDAT.acidenteDat[0].logradouro.nomeBairro + " " + this.edatService.eDAT.acidenteDat[0].zona;
	console.log(endereco);
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
	
	enderecoCruzamento += " "+this.edatService.eDAT.acidenteDat[0].logradouroCruzamento.nomeBairro + " " + this.edatService.eDAT.acidenteDat[0].zona;
	console.log(enderecoCruzamento);
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
		", conduzido por " + veiculo.nomeCondutorOutroVeiculo + ", CPF " + veiculo.cpf;
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
    }
    myReader.readAsDataURL(file);
  }
  
}