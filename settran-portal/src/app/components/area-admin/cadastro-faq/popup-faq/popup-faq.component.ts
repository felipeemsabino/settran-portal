import { Component, OnInit, Input } from '@angular/core';
import { FaqService } from '../services/faq.service';
import { URLSearchParams } from '@angular/http';

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
    // $('#myModal').modal('hide'); // fecha modal
    let params: URLSearchParams = new URLSearchParams();
    params = this.entity;
    // Salva dado
    this.faqService.saveData(params)
                      .subscribe(
                          result => {
                            alert('Dados gravados com sucesso!');
                            //$('#recarregaGrid').click();
                          }, //Bind to view
                          err => {
                            alert('Ocorreram erros ao gravar os dados! Tente novamente!');
                            console.log(err);
                          });
  }
  
  deleteData () {
    let params: URLSearchParams = new URLSearchParams();
    params = this.entity;
    // Deleta dado
    this.faqService.deleteData(this.entity.id)
                      .subscribe(
                          result => {
                            alert('Dado deletado com sucesso!');
                            //$('#recarregaGrid').click();
                          }, //Bind to view
                          err => {
                            alert('Ocorreram erros ao deletar o dado! Tente novamente!');
                            console.log(err);
                          });
  }
  
}