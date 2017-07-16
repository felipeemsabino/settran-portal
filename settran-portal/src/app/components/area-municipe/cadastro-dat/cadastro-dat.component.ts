import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-cadastro-dat',
  templateUrl: './cadastro-dat.component.html',
  styleUrls: ['./cadastro-dat.component.css']
})
export class CadastroDatComponent implements OnInit {
  
  //this.parentRouter.navigateByUrl('/login');

  constructor(private parentRouter: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }
  
  cancelar() {
	alert('cancelar');
  }
  
  voltar() {
	alert('voltar');
  }
  
  avancar() {
	//this.parentRouter.navigate(['/app-seu-veiculo', this.selectedHero.id]);
	this.parentRouter.navigate(['/cadastro-dat/app-seu-veiculo']);
  }

}
