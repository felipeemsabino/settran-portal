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
	if(!this.entity.ativo) {
		this.entity.ativo = 'S';
		this.entity.adm = 'S';
	}
	
  }
  
  constructor(private agenteService: AgenteService) { }

  ngOnInit() {
    this.setCPFMask();
  }
  
  setCPFMask () {
	$('.cpf').mask('000.000.000-00', {reverse: true});
  }
  
  resetMasks() {
	setTimeout(function() {
	  $('.cpf').mask('000.000.000-00', {reverse: true});
	}, 500);
  }
  
  validaSenhas() {
    if(this.entity.senha != $('#confirmacaoSenha').val()) {
		return false;
	}
	return true;
  }
  
  onSubmit() {
    let params: URLSearchParams = new URLSearchParams();
	this.entity.cpfAgente = this.entity.cpfAgente.replace(/\D/g,'');
	
	if(!this.validaSenhas()) {
		alert('Senhas não conferem.');
		return false;
	}
	
	$('#loadingModal').modal('show'); // abre loadingModal
    params = this.entity;
    // Salva dado
    this.agenteService.saveData(params)
                      .subscribe(
                          result => {
							$('#loadingModal').modal('hide'); // fecha loadingModal
                            $('#recarregaGrid').click();
							
                          }, //Bind to view
                          err => {
                            alert('Ocorreram erros ao gravar os dados! Por favor, tente novament!');
							$('#loadingModal').modal('hide'); // fecha loadingModal
                            console.log(err);
							this.resetMasks();
                          });
  }
  
  deleteData () {}

  setAtivo() {
    if(this.entity.ativo == 'S')
		this.entity.ativo = 'N';
	if(this.entity.ativo == 'N')
		this.entity.ativo = 'S';
  }
  
  alteraAdm(adm: string) {
    this.entity.adm = adm;
  }
}
