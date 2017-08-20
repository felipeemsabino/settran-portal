import { Component, OnInit } from '@angular/core';
import { EDATService } from '../../../shared/services/e-dat.service';

@Component({
  selector: 'app-testemunhas',
  templateUrl: './testemunhas.component.html',
  styleUrls: ['./testemunhas.component.css']
})
export class TestemunhasComponent implements OnInit {

  constructor(public edatService: EDATService) { }

  ngOnInit() {
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
