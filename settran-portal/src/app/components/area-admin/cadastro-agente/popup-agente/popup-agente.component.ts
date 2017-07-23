import { Component, OnInit, Input } from '@angular/core';
import { AgenteService } from '../services/agente.service';
import { URLSearchParams } from '@angular/http';

declare var $:any; // JQUERY

@Component({
  selector: 'app-popup-agente',
  templateUrl: './popup-agente.component.html',
  styleUrls: ['./popup-agente.component.css'],
  providers: [AgenteService]
})
export class PopupAgenteComponent implements OnInit {
  
  entity: any;
  
  @Input('object')
  set object(value: any) {
	this.entity = Object.assign({}, value);
  }
  
  constructor(private agenteService: AgenteService) { }

  ngOnInit() {
    this.setCPFMask();
  }
  
  setCPFMask () {
	$('.cpf').mask('000.000.000-00', {reverse: true});
  }
  
  onSubmit() {
	console.log(this.object);
  }

}
