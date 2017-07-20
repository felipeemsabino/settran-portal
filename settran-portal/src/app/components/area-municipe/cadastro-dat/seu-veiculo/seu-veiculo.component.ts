import { Component, OnInit, Input } from '@angular/core';
import { EDATService } from '../../../shared/services/e-dat.service';

@Component({
  selector: 'app-seu-veiculo',
  templateUrl: './seu-veiculo.component.html',
  styleUrls: ['./seu-veiculo.component.css']
})
export class SeuVeiculoComponent implements OnInit {

  constructor(private edatService: EDATService) { }

  ngOnInit() { }
  
  alteraPossuiVeiculo() {}
  
  setDadosProprietario() {
    this.edatService.eDAT.nomePropietario = this.edatService.eDAT.nomeMunicipe;
    this.edatService.eDAT.docPropietario = this.edatService.eDAT.cpf;
  }

}
