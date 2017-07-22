import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { EDATService } from '../../shared/services/e-dat.service';

declare var $:any; // JQUERY

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

  eDAT: any;
  currentPage: string;
    
  constructor(private parentRouter: Router, private activatedRoute: ActivatedRoute, private edatService: EDATService) {	
  
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
		if(!this.validarPerguntas())
			break;
		
	    this.parentRouter.navigate([CadastroDatComponent.SEU_VEICULO]);
	    break; 
	  }
	  case CadastroDatComponent.SEU_VEICULO: {
		if(!this.validarAbaSeuVeiculo())
			break;
			
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
  
  /* Validacao de perguntas */
  validarPerguntas(){
    let validacao = true;
	validacao = this.validarTotalRespostas();
	if(!validacao)
		return validacao;

	validacao = this.validarRespostasEsperadas();
	
	if(!validacao)
		$('#modalAlertaRegras').modal('show');
	return validacao;
	
  }
  
  validarTotalRespostas(){
    for (let p of this.edatService.perguntas) {
		if(p.resposta.length == 0) {
			alert('Por favor, responda todas as perguntas antes de prosseguir com o registro da DAT.');
			return false;
		}
	}
	return true;
  }
  
  validarRespostasEsperadas() {
    this.edatService.respostasInvalidas = new Array();
    for (let index in this.edatService.resultadoPerguntas) {
		if(this.edatService.resultadoPerguntas[index].resposta != this.edatService.perguntas[index].resposta ) {
			this.edatService.respostasInvalidas.push(this.edatService.resultadoPerguntas[index]);
		}
	}
	if(this.edatService.respostasInvalidas.length == 0)
		return true;
	return false;
  }
  
  /* Validacao dos dados seu-veiculo */
  
    validarAbaSeuVeiculo(){
      let validacao = true;	
	  
	  validacao = this.validaAba2DadosObrigatorios();
	  if(!validacao)
		return validacao;
	  
	  validacao = this.validaAba2Email();
	  if(!validacao)
		return validacao;
		
	  return validacao;
	}
	
	validaAba2DadosObrigatorios () {
	  let camposObrigatorios = $( ".form-group" ).not(".nao-obrigatorio");
	  camposObrigatorios.removeClass('has-error');
	  
	  let camposNaoPreenchidos = camposObrigatorios.find('input, select').filter(function() { return $(this).val() == ""; });
	  if (camposNaoPreenchidos.length > 0) {
		camposNaoPreenchidos.parent().addClass('has-error');
		alert('Favor preencher todos os campos obrigatórios.');
		return false;
	  }
	  
	  return true;
	}
	
	validaAba2Email() {
	  let camposEmails = $( ".form-group.municipe-email" );
	  camposEmails.removeClass('has-error');
	  let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

	  if( !$( "#emailMunicipe" ).val().match(emailRegex) ) {
	    alert('Favor inserir um e-mail válido.');
		camposEmails.addClass('has-error');
		return false;
	  }
	  
	  if ( $( "#emailMunicipe" ).val() != $( "#emailMunicipeConfirm" ).val() ){
	    alert('E-mails não conferem.');
		camposEmails.addClass('has-error');
		return false;
	  }
	  
	  return true;
	}
}
