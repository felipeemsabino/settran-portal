import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { EDATService } from '../../shared/services/e-dat.service';
import { PopupControllerComponent } from '../../shared/popup-controller/popup-controller.component';

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
  aba: number;
  action: string = '';

  constructor(private parentRouter: Router, private activatedRoute: ActivatedRoute,
    public edatService: EDATService, private popupController: PopupControllerComponent) {
    this.aba = 1;

    this.parentRouter.navigate([CadastroDatComponent.PERGUNTAS_PRELIMINARES]);

    this.edatService.limparDados();

  	parentRouter.events.subscribe((val) => {
    	  if(val instanceof NavigationEnd) {
            this.currentPage = val.url;
            if(this.action == 'back'){

                if(this.aba > 1)
                  this.aba--;
                $('#aba'+this.aba).css('background-color','#F0E68C');
                $('#aba'+(this.aba+1)).css('background-color','transparent');
            }
            else if(this.action == 'next'){

              if(this.aba < 8) // recupera id da aba
                this.aba++;
              $('#aba'+this.aba).css('background-color','#F0E68C'); // altera cor de background das abas
              $('#aba'+(this.aba-1)).css('background-color','transparent');
            }
            $("html,body").scrollTop(100);
    	  }
      });
  }

  ngOnInit() {
    this.getUserIp();
    this.edatService.habilitarEdicaoCampos();
  }

  cancelar() {
     var txt;
     var r = confirm("Tem certeza que deseja cancelar o registro da DAT?");
     if (r == true) {
       this.edatService.cancelarEDAT();
       this.parentRouter.navigate(['']);
     }
  }

  changePage(action: string) {
    this.action = action;
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
		  //this.edatService.alteraFormatoInputData(); // coloca as mascaras no padrao do input
	    this.parentRouter.navigate([CadastroDatComponent.TESTEMUNHAS]);
	    break;
	  }
	  case CadastroDatComponent.CONFIRMACAO_DAT: {
	    this.parentRouter.navigate([CadastroDatComponent.RELATO_ACIDENTE]);
	    break;
	  }
	  case CadastroDatComponent.RESUMO: {
      this.edatService.setAtributosBrancos();
	    this.parentRouter.navigate([CadastroDatComponent.CONFIRMACAO_DAT]);
	    break;
	  }
	}
  }

  avancar() {

  /*if(!this.validarEmail()){
		return false;
	}*/

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
      if(!this.validaDadosObrigatorios() || !this.validaDataNascTestemunha())
        break;

		  //this.edatService.alteraFormatoPadraoData(); // coloca as mascaras no padrao do banco de dados
	    this.parentRouter.navigate([CadastroDatComponent.RELATO_ACIDENTE]);
	    break;
	  }
	  case CadastroDatComponent.RELATO_ACIDENTE: {
	    this.parentRouter.navigate([CadastroDatComponent.CONFIRMACAO_DAT]);
	    break;
	  }
	  case CadastroDatComponent.CONFIRMACAO_DAT: {
	    if(!this.validaCodigo()) {
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
      this.popupController.showPopupMessage("Atenção!", 'Por favor, entre com um email válido.', true);
  		return false;
  	}
  	return true;
  }

  confirmar() {
    if(this.edatService.eDAT.confirmacaoDados == 'S') {

		this.edatService.limpaAtributosBranco();
    console.log(this.edatService.eDAT);
		this.edatService.enviarEDAT()
				  .subscribe(
					  result => {
            this.popupController.showPopupMessage("Atenção!", 'EDAT criada com sucesso.', true);
					  }, //Bind to view
					  err => {
						console.log(err);
            this.popupController.showPopupMessage("Atenção!", 'Ocorreram erros ao criar a e-DAT. Verifique os dados e tente novamente!', true);
					  });
  	} else {
      this.popupController.showPopupMessage("Atenção!", 'Necessário aceitar os termos e condições antes de prosseguir!', true);
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
        this.popupController.showPopupMessage("Atenção!",
        'Por favor, responda todas as perguntas antes de prosseguir com o registro da eDAT.', true);

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

  	  validacao = this.validaDataNascimento();
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

      this.popupController.showPopupMessage("Atenção!",
      'Favor preencher todos os campos obrigatórios.', true);

      return false;
	  }

	  return true;
	}

  validaAba2Email() {
	  let camposEmails = $( ".form-group.municipe-email" );
	  camposEmails.removeClass('has-error');
	  let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

	  if( !$( "#emailMunicipe" ).val().match(emailRegex) ) {

      this.popupController.showPopupMessage("Atenção!",
      'Favor inserir um e-mail válido.', true);
      camposEmails.addClass('has-error');
      return false;
	  }

	  if ( $( "#emailMunicipe" ).val() != $( "#emailMunicipeConfirm" ).val() ){
      this.popupController.showPopupMessage("Atenção!",
      'Os e-mails informados não conferem.', true);
      camposEmails.addClass('has-error');
      return false;
	  }

	  return true;
	}

  validaDataNascTestemunha(){
    for(let testemunha of this.edatService.eDAT.testemunhasDat) {
      let hoje = new Date().getTime();
  	  let dataNascimento = $.datepicker.parseDate('dd/mm/yy',testemunha.dataNascimento).getTime();
  	  if(hoje <= dataNascimento) {
          this.popupController.showPopupMessage("Atenção!",
          'Data de nascimento inválida.', true);
  	      return false;
  	  }
    }
    return true;
  }

  validaDataNascimento() {
    let hoje = new Date().getTime();
	  let dataNascimento = $.datepicker.parseDate('dd/mm/yy',this.edatService.eDAT.dataNascimento).getTime();
	  if(hoje <= dataNascimento) {
        this.popupController.showPopupMessage("Atenção!",
        'Data de nascimento inválida.', true);
	      return false;
	  }
	  return true;
  }

  marcaLabelInvalido(labelClass: string){
    let camposObrigatorios = $( "."+labelClass );
    camposObrigatorios.addClass('label-has-error');
  }

  desmarcaLabelInvalido(labelClass: string){
    let camposObrigatorios = $( "."+labelClass );
    camposObrigatorios.removeClass('label-has-error');
  }

	validaAba3Options() {
	  if(this.edatService.eDAT.acidenteDat[0].tipoAcidente == "") {
      this.popupController.showPopupMessage("Atenção!",
      'Favor informar o tipo de acidente.', true);
        this.marcaLabelInvalido('label-tipo-acid-obrigatorio');
		    return false;
	  } else { this.desmarcaLabelInvalido('label-tipo-acid-obrigatorio'); }

	  if(this.edatService.eDAT.acidenteDat[0].zona == "") {
      this.popupController.showPopupMessage("Atenção!",
      'Favor informar a zona em que o acidente ocorreu.', true);
        this.marcaLabelInvalido('label-zona-obrigatorio');
      return false;
    } else { this.desmarcaLabelInvalido('label-zona-obrigatorio'); }

	  let dataLimite = new Date().getTime() - (30 * 24 * 60 * 60 * 1000);
	  let dataAcidente = $.datepicker.parseDate('dd/mm/yy',this.edatService.eDAT.acidenteDat[0].dataAcidente).getTime();
	  if(dataAcidente < dataLimite) {
      this.popupController.showPopupMessage("Atenção!",
      'Não é possível registrar eDAT com data do acidente anterior a 30 dias!', true);
      return false;
	  }

    let hoje = new Date().getTime();
	  if(hoje <= dataAcidente) {
        this.popupController.showPopupMessage("Atenção!",
        'Não é possível registrar eDAT com data do acidente futura!', true);
	      return false;
	  }
	     return true;
	}

	validaAba4Options() {
	  for (let veiculo of this.edatService.eDAT.outrosVeiculosDat) {
	    if(veiculo.temSeguro == "") {
        this.popupController.showPopupMessage("Atenção!",
        'Por favor, informe se os veículos possuem seguro.', true);
    		  return false;
	    }
	  }

	  return true;
	}

	getUserIp(){
    this.edatService.eDAT.ipRequisicao = "192.168.2.2";

		/*let self = this;
		$.getJSON('//freegeoip.net/json/?callback=?', function(data) {
		  self.edatService.eDAT.ipRequisicao = data.ip;
		});*/
	}

  validaCodigo() {
    if(this.edatService.codigoVerificado == 'N' || !this.edatService.codigoVerificado){
      this.popupController.showPopupMessage("Atenção!",
      'Por favor, valide o código recebido no email ou sms antes de prosseguir.', true);
        return false;
    }
    return true;
  }
}
