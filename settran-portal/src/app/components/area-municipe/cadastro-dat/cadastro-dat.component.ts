import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { EDATService } from '../../shared/services/e-dat.service';

@Component({
  selector: 'app-cadastro-dat',
  templateUrl: './cadastro-dat.component.html',
  styleUrls: ['./cadastro-dat.component.css'],
  providers: [EDATService]
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

  eDAT: any;
  currentPage: string;
    
  constructor(private parentRouter: Router, private activatedRoute: ActivatedRoute, private eDATService: EDATService) {	
    this.parentRouter.navigate([CadastroDatComponent.PERGUNTAS_PRELIMINARES]);
		
	parentRouter.events.subscribe((val) => {
	  if(val instanceof NavigationEnd) {
        this.currentPage = val.url;
	  }
    });
  }

  ngOnInit() {
  }
  
  cancelar() {
	alert('cancelar');
  }
  
  changePage(action: string) {
	if(action == "back")
	  this.voltar();
	else if (action == "next")
	  this.avancar();
  }
  
  voltar() {
  
	switch(this.currentPage) {
	  case CadastroDatComponent.PERGUNTAS_PRELIMINARES: {
	    this.parentRouter.navigate([CadastroDatComponent.SEU_VEICULO]);
	    break; 
	  }
	  case CadastroDatComponent.SEU_VEICULO: {
	    this.parentRouter.navigate([CadastroDatComponent.PERGUNTAS_PRELIMINARES]);
	    break; 
	  }
	  case CadastroDatComponent.DADOS_ACIDENTE: {
	    this.parentRouter.navigate([CadastroDatComponent.SEU_VEICULO]);
	    break; 
	  }  
	  case CadastroDatComponent.OUTROS_VEICULOS: {
	    this.parentRouter.navigate([CadastroDatComponent.DADOS_ACIDENTE]);
	    break; 
	  }  
	  case CadastroDatComponent.TESTEMUNHAS: {
	    this.parentRouter.navigate([CadastroDatComponent.OUTROS_VEICULOS]);
	    break; 
	  }  
	  case CadastroDatComponent.RELATO_ACIDENTE: {
	    this.parentRouter.navigate([CadastroDatComponent.TESTEMUNHAS]);
	    break; 
	  }  
	  case CadastroDatComponent.CONFIRMACAO_DAT: {
	    this.parentRouter.navigate([CadastroDatComponent.RELATO_ACIDENTE]);
	    break; 
	  }  
	  case CadastroDatComponent.RESUMO: {
	    this.parentRouter.navigate([CadastroDatComponent.CONFIRMACAO_DAT]);
	    break; 
	  } 
	}
  }
  
  avancar() {
	
	switch(this.currentPage) {
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
  
  confirmar() {
    alert('Confirma eDAT');
  }
  
  getPergPreliminaresUrl() {
    return CadastroDatComponent.PERGUNTAS_PRELIMINARES;
  }
  
  getResumoUrl() {
    return CadastroDatComponent.RESUMO;
  }
}
