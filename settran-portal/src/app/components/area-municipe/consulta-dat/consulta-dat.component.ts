import { Component, OnInit } from '@angular/core';
import { ConsultadatService } from './services/consultadat.service';
import { URLSearchParams } from '@angular/http';


declare var $:any; // JQUERY

@Component({
  selector: 'app-consulta-dat',
  templateUrl: './consulta-dat.component.html',
  styleUrls: ['./consulta-dat.component.css']
})

export class ConsultaDatComponent implements OnInit {
  dadosConsulta: any;
  captcha: any;
  
  constructor(private datService: ConsultadatService) { }

  ngOnInit() {
    this.dadosConsulta = {
		"codigoConfirmacao":"0-4340",
		"cpf":"07046919658",
		"cnh":"111111"
	};
	this.captcha = "";
	this.resetCPFMask();
  }
  
  resetCPFMask() {
	setTimeout(function() {
		$('#cpf').unmask().mask('000.000.000-00', {reverse: true});
	}, 500);
  }
  cancelar(){
  
  }
  
  consultar(){
    if(!this.validaDadosObrigatorios()) {
      return;
    }
    
	this.consultarDat();
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
  
  consultarDat() {
    var me = this;
	
    let params: URLSearchParams = new URLSearchParams();
	this.dadosConsulta.cpf = this.dadosConsulta.cpf.replace(/\D/g,'');
	
	$('#loadingModal').modal('show'); // abre loadingModal
    params = this.dadosConsulta;
	
    // Salva dado
    this.datService.consultaDat(params)
                      .subscribe(
                          result => {
							$('#loadingModal').modal('hide'); // fecha loadingModal
                            $('#recarregaGrid').click();
							window.open("http://ec2-52-67-135-39.sa-east-1.compute.amazonaws.com:8080/wsedat"+result);
                          }, //Bind to view
                          err => {
                            alert('Ocorreram erros ao realizar a consulta da DAT! Por favor, tente novament!');
							$('#loadingModal').modal('hide'); // fecha loadingModal
                            console.log(err);
                          });
  }
}
