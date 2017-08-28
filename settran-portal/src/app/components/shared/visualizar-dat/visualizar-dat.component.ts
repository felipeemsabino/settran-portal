import { Component, OnInit } from '@angular/core';
import { EdatStorageService } from '../../shared/services/edat-storage.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { EDATService } from '../../shared/services/e-dat.service';
import { PopupControllerComponent } from '../../shared/popup-controller/popup-controller.component';
import { VeiculoService } from '../../shared/services/veiculo.service';
import { EnderecoService } from '../../shared/services/endereco.service';

declare var $:any; // JQUERY

@Component({
  selector: 'app-visualizar-dat',
  templateUrl: './visualizar-dat.component.html',
  styleUrls: ['./visualizar-dat.component.css'],
  providers: [VeiculoService, EnderecoService]
})
export class VisualizarDatComponent implements OnInit {

     SEU_VEICULO = "";
     DADOS_ACIDENTE = "";
     OUTROS_VEICULOS = "";
     TESTEMUNHAS = "";
     RELATO_ACIDENTE = "";

    eDAT: any;
    currentPage: string;
    aba: number;
    action: string = '';
    sub: any;

    constructor(private parentRouter: Router, private activatedRoute: ActivatedRoute,
      public edatService: EDATService, private popupController: PopupControllerComponent,
      private veiculoService: VeiculoService, private enderecoService: EnderecoService) {
      this.aba = 1;

      if(this.edatService.edicaoDAT == false) {
        this.SEU_VEICULO = "/area-agente/validar-dat/visualizar-dat/seu-veiculo-validar-dat";
        this.DADOS_ACIDENTE = "/area-agente/validar-dat/visualizar-dat/dados-acidente";
        this.OUTROS_VEICULOS = "/area-agente/validar-dat/visualizar-dat/outros-veiculos-validar-dat";
        this.TESTEMUNHAS = "/area-agente/validar-dat/visualizar-dat/testemunhas";
        this.RELATO_ACIDENTE = "/area-agente/validar-dat/visualizar-dat/relato";
      } else {
        this.SEU_VEICULO = "/area-agente/revisar-dat/visualizar-dat/seu-veiculo-validar-dat";
        this.DADOS_ACIDENTE = "/area-agente/revisar-dat/visualizar-dat/dados-acidente";
        this.OUTROS_VEICULOS = "/area-agente/revisar-dat/visualizar-dat/outros-veiculos";
        this.TESTEMUNHAS = "/area-agente/revisar-dat/visualizar-dat/testemunhas";
        this.RELATO_ACIDENTE = "/area-agente/revisar-dat/visualizar-dat/relato";
      }

      this.parentRouter.navigate([this.SEU_VEICULO]);

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

                if(this.aba < 6) // recupera id da aba
                  this.aba++;
                $('#aba'+this.aba).css('background-color','#F0E68C'); // altera cor de background das abas
                $('#aba'+(this.aba-1)).css('background-color','transparent');
              }
              $("html,body").scrollTop(100);
      	  }
        });
    }

    ngOnInit() {
      console.log('comecou a visualizar-dat '+this.edatService.edicaoDAT);
      console.log('comecou a visualizar-dat '+this.edatService.eDAT);
      this.edatService.edicaoFotos = false;
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
  	  case this.DADOS_ACIDENTE: {
  	    this.parentRouter.navigate([this.SEU_VEICULO]);
  	    break;
  	  }
  	  case this.OUTROS_VEICULOS: {
  	    this.parentRouter.navigate([this.DADOS_ACIDENTE]);
  	    break;
  	  }
  	  case this.TESTEMUNHAS: {
  	    this.parentRouter.navigate([this.OUTROS_VEICULOS]);
  	    break;
  	  }
  	  case this.RELATO_ACIDENTE: {
  		  //this.edatService.alteraFormatoInputData(); // coloca as mascaras no padrao do input
  	    this.parentRouter.navigate([this.TESTEMUNHAS]);
  	    break;
  	  }
  	}
    }

    avancar() {

    /*if(!this.validarEmail()){
  		return false;
  	}*/

  	switch(this.currentPage) {
  	  case this.SEU_VEICULO: {
  		if(this.edatService.edicaoDAT && !this.validarAbaSeuVeiculo())
  			break;

  		this.parentRouter.navigate([this.DADOS_ACIDENTE]);
  	    break;
  	  }
  	  case this.DADOS_ACIDENTE: {
  		if(this.edatService.edicaoDAT && !this.validaDadosObrigatorios () || !this.validaAba3Options())
  			break;

  	    this.parentRouter.navigate([this.OUTROS_VEICULOS]);
  	    break;
  	  }
  	  case this.OUTROS_VEICULOS: {
  		if(this.edatService.edicaoDAT && !this.validaDadosObrigatorios () || !this.validaAba4Options())
  			break;

  	    this.parentRouter.navigate([this.TESTEMUNHAS]);
  	    break;
  	  }
  	  case this.TESTEMUNHAS: {
        if(this.edatService.edicaoDAT && !this.validaDataNascTestemunha())
          break;

  		  //this.edatService.alteraFormatoPadraoData(); // coloca as mascaras no padrao do banco de dados
  	    this.parentRouter.navigate([this.RELATO_ACIDENTE]);
  	    break;
  	  }
  	  default: { // navegar para tela inicial
  	    //this.parentRouter.navigate([this.PERGUNTAS_PRELIMINARES]);
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
  		console.log(JSON.stringify(this.edatService.eDAT));
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

    getSeusDadosURL() {
      return this.SEU_VEICULO;
    }

    getRelatoUrl() {
      return this.RELATO_ACIDENTE;
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
    	  let dataNascimento = new Date(testemunha.dataNascimento).getTime();
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
  	  let dataNascimento = new Date(this.edatService.eDAT.dataNascimento).getTime();
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
  	  let dataAcidente = new Date(this.edatService.eDAT.acidenteDat[0].dataAcidente).getTime();
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
  		let self = this;
  		$.getJSON('//freegeoip.net/json/?callback=?', function(data) {
  		  self.edatService.eDAT.ipRequisicao = data.ip;
  		});
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
