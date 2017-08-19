import { Component, OnInit, Input } from '@angular/core';
import { FaqService } from '../services/faq.service';
import { URLSearchParams } from '@angular/http';
import { PopupControllerComponent } from '../../../shared/popup-controller/popup-controller.component';

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

  constructor(private faqService: FaqService, private popupController: PopupControllerComponent) { }

  ngOnInit() {
  }

  onSubmit() {
    this.popupController.showPopupMessage("Aguarde!", "Salvando registros...", false);

    let params: URLSearchParams = new URLSearchParams();
    params = this.entity;
    // Salva dado
    this.faqService.saveData(params)
                      .subscribe(
                          result => {
                            this.popupController.showPopupMessage("Atenção!",
                            "Registro gravado com sucesso.", true);
                            $('#loadingModal').on('hidden.bs.modal', function () {
                              $('#faqModal').modal('hide');
                              $('#recarregaGrid').click();
                              $('#loadingModal').unbind('hidden');
                            });

                          }, //Bind to view
                          err => {
                            this.popupController.showPopupMessage("Atenção!",
                            "Ocorreram erros ao salvar o registro! Por favor, tente novamente.", true);                              console.log(err);
                            console.log(err);
                          });
  }

  deleteData () {
    var txt;
    var r = confirm("Deseja realmente remover esse registro?");
    if (r == true) {
      this.popupController.showPopupMessage("Aguarde!", "Removendo registro...", false);

      let params: URLSearchParams = new URLSearchParams();
      params = this.entity;
      // Deleta dado
      this.faqService.deleteData(this.entity.id)
                        .subscribe(
                            result => {
                              this.popupController.showPopupMessage("Atenção!",
                              "Registro removido com sucesso.", true);
                              $('#faqModal').modal('hide'); // fecha modal
                              $('#loadingModal').on('hidden.bs.modal', function () {
                                $('#recarregaGrid').click();
                                $('#loadingModal').unbind('hidden');
                              });
                            }, //Bind to view
                            err => {
                              this.popupController.showPopupMessage("Atenção!",
                              "Ocorreram erros ao remover o registro! Por favor, tente novamente.", true);                              console.log(err);
                              console.log(err);
                            });
    }
  }

}
