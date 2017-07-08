import { Component, OnInit, Input } from '@angular/core';
import { AgenteService } from '../services/agente.service';
import { URLSearchParams } from '@angular/http';

@Component({
  selector: 'app-popup-agente',
  templateUrl: './popup-agente.component.html',
  styleUrls: ['./popup-agente.component.css'],
  providers: [AgenteService]
})
export class PopupAgenteComponent implements OnInit {

  @Input('object') object: any;
  
  constructor() { }

  ngOnInit() {}
  
  onSubmit() {
	console.log(this.object);
  }

}
