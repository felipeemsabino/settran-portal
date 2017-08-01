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
    
  constructor(private parentRouter: Router, private activatedRoute: ActivatedRoute, public edatService: EDATService) {	
  
    this.parentRouter.navigate([CadastroDatComponent.PERGUNTAS_PRELIMINARES]);
		
	parentRouter.events.subscribe((val) => {
	  if(val instanceof NavigationEnd) {
        this.currentPage = val.url;
	  }
    });
  }

  ngOnInit() {
    this.getUserIp();
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
		this.edatService.alteraFormatoInputData(); // coloca as mascaras no padrao do input
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
	if(!this.validarEmail()){
		return false;
	}
	
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
		if(!this.validaDadosObrigatorios () || !this.validaAba3Options())
			break;
			
	    this.parentRouter.navigate([CadastroDatComponent.OUTROS_VEICULOS]);
	    break; 
	  }  
	  case CadastroDatComponent.OUTROS_VEICULOS: {
		if(!this.validaDadosObrigatorios () || !this.validaAba4Options())
			break;
			
	    this.parentRouter.navigate([CadastroDatComponent.TESTEMUNHAS]);
	    break; 
	  }  
	  case CadastroDatComponent.TESTEMUNHAS: {
		this.edatService.alteraFormatoPadraoData(); // coloca as mascaras no padrao do banco de dados
	    this.parentRouter.navigate([CadastroDatComponent.RELATO_ACIDENTE]);
	    break; 
	  }  
	  case CadastroDatComponent.RELATO_ACIDENTE: {
	    this.parentRouter.navigate([CadastroDatComponent.CONFIRMACAO_DAT]);
	    break; 
	  }  
	  case CadastroDatComponent.CONFIRMACAO_DAT: {
	    if(this.edatService.codigoVerificado == 'N' || !this.edatService.codigoVerificado) {
		  return;
		}
	    this.parentRouter.navigate([CadastroDatComponent.RESUMO]);
	    break; 
	  } 
	  default: { // navegar para tela inicial
	    //this.parentRouter.navigate([CadastroDatComponent.PERGUNTAS_PRELIMINARES]);
	    break; 
	  }
	}
  }  
  
  validarEmail() {
    if($('.email').length == 0)
		return true;
		
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	if(!$('.email').val().match(re)) {
		alert('Por favor, entre com um email válido.');
		return false;
	}
	return true;
  }
  confirmar() {
    if(this.edatService.eDAT.confirmacaoDados == 'S') {
		
		//console.log(JSON.stringify(this.edatService.eDAT));
		
		$('#loadingModal').modal('show'); // fecha modal
		this.edatService.enviarEDAT()
				  .subscribe(
					  result => {
						alert('e-DAT criada com sucesso!');
						$('#loadingModal').modal('hide'); // fecha modal
					  }, //Bind to view
					  err => {
						console.log(err);	
						alert('Ocorreram erros ao criar a e-DAT. Verifique os dados e tente novamente!');
						$('#loadingModal').modal('hide'); // fecha modal	
					  });
	} else {
		alert('Necessário aceitar os termos e condições antes de prosseguir.');
	}
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
    if(this.edatService.perguntas.length == 0)
		return false;
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
	  
	  validacao = this.validaDadosObrigatorios();
	  if(!validacao)
		return validacao;
	  
	  validacao = this.validaAba2Email();
	  if(!validacao)
		return validacao;
		
	  return validacao;
	}
	
	validaDadosObrigatorios () {
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
	
	validaAba3Options() {
	  if(this.edatService.eDAT.acidenteDat[0].tipoAcidente == "") {
	    alert('Favor informar o tipo de acidente.');
		return false;
	  }
	   
	  if(this.edatService.eDAT.acidenteDat[0].zona == "") {
	    alert('Favor informar a zona.');
		return false;
	  }
	  
	  let dataLimite = new Date().getTime() - (30 * 24 * 60 * 60 * 1000);
	  let dataAcidente = new Date(this.edatService.eDAT.acidenteDat[0].dataAcidente).getTime();
	  if(dataAcidente < dataLimite) {
		alert('Não é possível registrar eDAT com data do acidente anterior a 30 dias!');
		return false;
	  }
	  return true;
	}
	
	validaAba4Options() {
	  for (let veiculo of this.edatService.eDAT.outrosVeiculosDat) {
	    if(veiculo.temSeguro == "") {
		  alert('Favor informar se os veículos possuem seguro.');
		  return false;
	    }
	  }
	  
	  return true;
	}
	
	getUserIp(){
		let self = this;
		$.getJSON('//freegeoip.net/json/?callback=?', function(data) {
		  self.edatService.eDAT.ipRequisicao = data.ip;
		});
	}
}
