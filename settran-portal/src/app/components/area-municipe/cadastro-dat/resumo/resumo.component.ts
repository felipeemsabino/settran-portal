import { Component, OnInit } from '@angular/core';
import { EDATService } from '../../../shared/services/e-dat.service';

declare var $:any; // JQUERY

@Component({
  selector: 'app-resumo',
  templateUrl: './resumo.component.html',
  styleUrls: ['./resumo.component.css']
})
export class ResumoComponent implements OnInit {

  constructor(private edatService: EDATService) { }

  ngOnInit() {   
    if(!this.edatService.eDAT.confirmacaoDados) {
	  this.edatService.eDAT.confirmacaoDados = 'N';
    }
  }
  
  setDadosProprietario() {
    if(this.edatService.eDAT.confirmacaoDados == 'S') {
		this.edatService.eDAT.confirmacaoDados = 'N';
	} else if(this.edatService.eDAT.confirmacaoDados == 'N') {
		this.edatService.eDAT.confirmacaoDados = 'S';
	
	}
  }
}