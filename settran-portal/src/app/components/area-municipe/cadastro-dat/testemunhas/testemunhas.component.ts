import { Component, OnInit, ApplicationRef, ViewChildren, QueryList  } from '@angular/core';
import { EDATService } from '../../../shared/services/e-dat.service';
import { PopupControllerComponent } from '../../../shared/popup-controller/popup-controller.component';

declare var $:any; // JQUERY

@Component({
  selector: 'app-testemunhas',
  templateUrl: './testemunhas.component.html',
  styleUrls: ['./testemunhas.component.css']
})
export class TestemunhasComponent implements OnInit {

  constructor(public edatService: EDATService, public applicationRef: ApplicationRef, private popupController: PopupControllerComponent) { }

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
       yearRange: "-100:+0",
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

    if(this.edatService.eDAT.testemunhasDat.length == 2) {

      this.popupController.showPopupMessage("Atenção!",
      'Não é possível inserir mais de 2 testemunhas.', true);
    } else {
    	this.edatService.eDAT.testemunhasDat.push({
    		"nomeTestemunha": "",
    		"dataNascimento": "",
    		"rg": "",
    		"orgaoExpedidor": ""
    	});
    }
  }
  @ViewChildren('allRows') things: QueryList<any>;

  ngAfterViewInit() {
    this.things.changes.subscribe(t => {
      this.ngForRendred();
    })
  }

  ngForRendred() {
    this.applyDatePicker();
    if(this.edatService.eDAT.testemunhasDat.length == 0)
      return;
    document.getElementById('panel'+this.edatService.eDAT.testemunhasDat.length).scrollIntoView();
  }
}
