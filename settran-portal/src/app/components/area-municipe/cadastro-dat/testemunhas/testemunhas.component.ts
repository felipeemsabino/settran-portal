import { Component, OnInit, ApplicationRef } from '@angular/core';
import { EDATService } from '../../../shared/services/e-dat.service';

declare var $:any; // JQUERY

@Component({
  selector: 'app-testemunhas',
  templateUrl: './testemunhas.component.html',
  styleUrls: ['./testemunhas.component.css']
})
export class TestemunhasComponent implements OnInit {

  constructor(public edatService: EDATService, public applicationRef: ApplicationRef) { }

  ngOnInit() {
    this.resetFiledsConfigurations();
  }

  resetFiledsConfigurations() {
    this.applyDatePicker();
    this.resetMasks();
  }

  resetMasks() {
    $('.date-picker-settran').mask('00/00/0000');
    $('.orgao-exp').mask('SSSSSSSSSS');
  }

  applyDatePicker() {
     var me = this;
     $( ".date-picker-settran" ).datepicker({
       dateFormat: 'dd/mm/yy',
       changeMonth: true,
       changeYear: true,
       onSelect: function(date) {
         var posicao = this.id.split('dataNascimento')[1];
         me.edatService.eDAT.testemunhasDat[posicao].dataNascimento = date;
       }
    });
  }

  removerTestemunha(index: number) {
    var txt;
    var r = confirm("Deseja realmente remover esse registro?");
    if (r == true) {
      this.edatService.eDAT.testemunhasDat.splice(index, 1);
    }
  }

  adicionarTestemunha() {
  	var self = this;

  	this.edatService.eDAT.testemunhasDat.push({
  		"nomeTestemunha": "",
  		"dataNascimento": "",
  		"rg": "",
  		"orgaoExpedidor": ""
  	});
  }

}
