import { Component, OnInit, Input } from '@angular/core';
import { RegrasService } from '../services/regras.service';
import { URLSearchParams } from '@angular/http';

declare var $:any; // JQUERY

@Component({
  selector: 'app-popup-regra',
  templateUrl: './popup-regra.component.html',
  styleUrls: ['./popup-regra.component.css'],
  providers: [RegrasService]
})
export class PopupRegraComponent implements OnInit {
  
  entity: any;
  
  @Input('object')
  set object(value: any) {
	this.entity = Object.assign({}, value);
  }
  constructor(private regrasService: RegrasService) { }

  ngOnInit() {
  }
  
  onSubmit() {
	$('#loadingModal').modal('show'); // abre loadingModal
	
    let params: URLSearchParams = new URLSearchParams();
    params = this.entity;
    // Salva dado
    this.regrasService.saveData(params)
                      .subscribe(
                          result => {
                            alert('Dados gravados com sucesso!');
							
							$('#regrasModal').modal('hide'); // fecha modal
							$('#loadingModal').modal('hide'); // fecha loadingModal
                            $('#recarregaGrid').click();
                          }, //Bind to view
                          err => {
                            alert('Ocorreram erros ao gravar os dados! Por favor, tente novament!');
							$('#loadingModal').modal('hide'); // fecha loadingModal
                            console.log(err);
                          });
  }
  
  deleteData () {
	$('#loadingModal').modal('show'); // abre loadingModal
	
    let params: URLSearchParams = new URLSearchParams();
    params = this.entity;
    // Deleta dado
    this.regrasService.deleteData(this.entity.id)
                      .subscribe(
                          result => {
                            alert('Dado deletado com sucesso!');
							
							$('#regrasModal').modal('hide'); // fecha modal
							$('#loadingModal').modal('hide'); // fecha loadingModal
                            $('#recarregaGrid').click();
                          }, //Bind to view
                          err => {
                            alert('Ocorreram erros ao deletar o dado! Por favor, tente novament!');
							$('#loadingModal').modal('hide'); // fecha loadingModal
                          });
  }
  
}