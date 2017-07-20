import { Component, OnInit, Input } from '@angular/core';
import { EDATService } from '../../../shared/services/e-dat.service';

declare var $:any; // JQUERY

@Component({
  selector: 'app-seu-veiculo',
  templateUrl: './seu-veiculo.component.html',
  styleUrls: ['./seu-veiculo.component.css']
})
export class SeuVeiculoComponent implements OnInit {

  constructor(private edatService: EDATService) { }

  ngOnInit() {
    this.setMasks();
  }
  
  setMasks() {
	$('.cep').mask('00000-000');
	$('.phone').mask('0000-0000');
    $('.phone_with_ddd').mask('(00) 00000-0000');
	$('.cpf').mask('000.000.000-00', {reverse: true});
  }
  
  resetCPFMask() {  
	setTimeout(function() {
		$('#docProprietario').unmask().mask('000.000.000-00', {reverse: true});
	}, 1000);
  }
  
  alteraPossuiVeiculo() {}
  
  setDadosProprietario() {
    this.edatService.eDAT.nomePropietario = this.edatService.eDAT.nomeMunicipe;
	console.log(this.edatService.eDAT.cpf);
	let doc = this.edatService.eDAT.cpf.replace(/\D/g,'');
	this.edatService.eDAT.docPropietario = doc;
    this.resetCPFMask();
  }

}
