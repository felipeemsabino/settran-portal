import { Component, OnInit } from '@angular/core';
import { EDATService } from '../../../shared/services/e-dat.service';

@Component({
  selector: 'app-dados-acidente',
  templateUrl: './dados-acidente.component.html',
  styleUrls: ['./dados-acidente.component.css']
})
export class DadosAcidenteComponent implements OnInit {

  constructor(private edatService: EDATService) { }

  ngOnInit() {
  }

  alteraTipoAcidente(tipoAcidente: string) {
	console.log('alteraTipoAcidente -> '+ tipoAcidente);
  }

  alteraZona(zona: string) {
	console.log('alteraZona -> '+ zona);
  }
}
