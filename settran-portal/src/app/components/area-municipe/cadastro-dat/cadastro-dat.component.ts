import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-cadastro-dat',
  templateUrl: './cadastro-dat.component.html',
  styleUrls: ['./cadastro-dat.component.css']
})
export class CadastroDatComponent implements OnInit {
  
  static readonly PERGUNTAS_PRELIMINARES = "/cadastro-dat/perguntas-preliminares";
  static readonly SEU_VEICULO = "/cadastro-dat/seu-veiculo";
  static readonly DADOS_ACIDENTE = "/cadastro-dat/dados-acidente";
  static readonly OUTROS_VEICULOS = "/cadastro-dat/outros-veiculos";
  static readonly TESTEMUNHAS = "/cadastro-dat/testemunhas";
  static readonly RELATO_ACIDENTE = "/cadastro-dat/relato";
  static readonly CONFIRMACAO_DAT = "/cadastro-dat/confirmacao-dat";
  static readonly RESUMO = "/cadastro-dat/resumo";

  constructor(private parentRouter: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
	this.parentRouter.navigate(['/cadastro-dat/perguntas-preliminares']);
  }
  
  cancelar() {
	alert('cancelar');
  }
  
  voltar() {
	alert('voltar');
  }
  
  avancar() {
	console.log(this.parentRouter.url);
	switch(this.parentRouter.url) {
	  case CadastroDatComponent.PERGUNTAS_PRELIMINARES: {
	    this.parentRouter.navigate([CadastroDatComponent.SEU_VEICULO]);
	    break; 
	  }
	  case CadastroDatComponent.SEU_VEICULO: {
	    this.parentRouter.navigate([CadastroDatComponent.DADOS_ACIDENTE]);
	    break; 
	  }
	  case CadastroDatComponent.DADOS_ACIDENTE: {
	    this.parentRouter.navigate([CadastroDatComponent.OUTROS_VEICULOS]);
	    break; 
	  }  
	  case CadastroDatComponent.OUTROS_VEICULOS: {
	    this.parentRouter.navigate([CadastroDatComponent.TESTEMUNHAS]);
	    break; 
	  }  
	  case CadastroDatComponent.TESTEMUNHAS: {
	    this.parentRouter.navigate([CadastroDatComponent.RELATO_ACIDENTE]);
	    break; 
	  }  
	  case CadastroDatComponent.RELATO_ACIDENTE: {
	    this.parentRouter.navigate([CadastroDatComponent.CONFIRMACAO_DAT]);
	    break; 
	  }  
	  case CadastroDatComponent.CONFIRMACAO_DAT: {
	    this.parentRouter.navigate([CadastroDatComponent.RESUMO]);
	    break; 
	  } 
	  default: { // navegar para tela inicial
	    //this.parentRouter.navigate([CadastroDatComponent.PERGUNTAS_PRELIMINARES]);
	    break; 
	  } 
	} 
  }
}
