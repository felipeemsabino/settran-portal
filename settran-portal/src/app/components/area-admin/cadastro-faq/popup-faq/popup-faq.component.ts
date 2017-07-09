import { Component, OnInit, Input } from '@angular/core';
import { FaqService } from '../services/faq.service';
import { URLSearchParams } from '@angular/http';

declare var $:any; // JQUERY

@Component({
  selector: 'app-popup-faq',
  templateUrl: './popup-faq.component.html',
  styleUrls: ['./popup-faq.component.css'],
  providers: [FaqService]
})
export class PopupFaqComponent implements OnInit {
  
  entity: any;
  
  @Input('object')
  set object(value: any) {
	this.entity = Object.assign({}, value);
  }
  constructor(private faqService: FaqService) { }

  ngOnInit() {
  }
  
  onSubmit() {
	$('#loadingModal').modal('show'); // abre loadingModal
	
    let params: URLSearchParams = new URLSearchParams();
    params = this.entity;
    // Salva dado
    this.faqService.saveData(params)
                      .subscribe(
                          result => {
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
    this.faqService.deleteData(this.entity.id)
                      .subscribe(
                          result => {
                            alert('Dado deletado com sucesso!');
							
							$('#faqModal').modal('hide'); // fecha modal
							$('#loadingModal').modal('hide'); // fecha loadingModal
                            $('#recarregaGrid').click();
                          }, //Bind to view
                          err => {
                            alert('Ocorreram erros ao deletar o dado! Por favor, tente novament!');
							$('#loadingModal').modal('hide'); // fecha loadingModal
                            console.log(err);
                          });
  }
  
}