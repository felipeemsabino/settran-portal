import { Component, OnInit } from '@angular/core';
import { EDATService } from '../../../shared/services/e-dat.service';

@Component({
  selector: 'app-relato',
  templateUrl: './relato.component.html',
  styleUrls: ['./relato.component.css']
})
export class RelatoComponent implements OnInit {
  
  constructor(private edatService: EDATService) { }
  
  ngOnInit() {
  
    if(this.edatService.eDAT.isPropietario == 'N' && this.edatService.eDAT.outrosVeiculosDat.length == 0) {
	  this.edatService.eDAT.eDAT.relatoDat[0].descricaoRelatoAcidente = this.edatService.eDAT.textosPadrao.padrao1;
	} else if(this.edatService.eDAT.isPropietario == 'S' && this.edatService.eDAT.outrosVeiculosDat.length == 0) {
	  this.edatService.eDAT.eDAT.relatoDat[0].descricaoRelatoAcidente = this.edatService.eDAT.textosPadrao.padrao2;
	} else if(this.edatService.eDAT.isPropietario == 'N' && this.edatService.eDAT.outrosVeiculosDat.length > 1) {
	  this.edatService.eDAT.eDAT.relatoDat[0].descricaoRelatoAcidente = this.edatService.eDAT.textosPadrao.padrao3;
	} else if(this.edatService.eDAT.isPropietario == 'S' && this.edatService.eDAT.outrosVeiculosDat.length > 1) {
	  this.edatService.eDAT.eDAT.relatoDat[0].descricaoRelatoAcidente = this.edatService.eDAT.textosPadrao.padrao4;
	}
	
	this.edatService.eDAT.eDAT.relatoDat[0].descricaoRelatoAcidente.replace("<< data do acidente>>", this.edatService.eDAT.acidenteDat[0].dataAcidente);
	this.edatService.eDAT.eDAT.relatoDat[0].descricaoRelatoAcidente.replace("<<hora do acidente>>", this.edatService.eDAT.acidenteDat[0].horaAcidente);
	this.edatService.eDAT.eDAT.relatoDat[0].descricaoRelatoAcidente.replace("<< endereço do acidente(tipologradouro, logradouro, n°, bairro, zona)>>",
		this.edatService.eDAT.acidenteDat[0].logradouro.tipoLogradouro + " " +this.edatService.eDAT.acidenteDat[0].logradouro.nomeLogradouro + " " +
		this.edatService.eDAT.acidenteDat[0].numeroEndereco + " " + this.edatService.eDAT.acidenteDat[0].logradouro.nomeBairro + " " +
		this.edatService.eDAT.acidenteDat[0].zona);
  }

}
