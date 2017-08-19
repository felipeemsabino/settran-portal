import { Component, OnInit, Input } from '@angular/core';
import { RegrasService } from '../services/regras.service';
import { URLSearchParams } from '@angular/http';
import { PopupControllerComponent } from '../../../shared/popup-controller/popup-controller.component';

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
	if(!this.entity.resposta) {
	  this.entity.resposta = 'S';
	}
  }
  constructor(private regrasService: RegrasService, private popupController: PopupControllerComponent) { }

  ngOnInit() {
  }

  onSubmit() {
    this.popupController.showPopupMessage("Aguarde!", "Salvando registros...", false);

    let params: URLSearchParams = new URLSearchParams();
    params = this.entity;
    // Salva dado
    this.regrasService.saveData(params)
                      .subscribe(
                          result => {
                            this.popupController.showPopupMessage("Atenção!",
                            "Registro gravado com sucesso.", true);
                            $('#loadingModal').on('hidden.bs.modal', function () {
                              $('#regrasModal').modal('hide');
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
      this.regrasService.deleteData(this.entity.id)
                        .subscribe(
                            result => {
                              this.popupController.showPopupMessage("Atenção!",
                              "Registro removido com sucesso.", true);
                              $('#regrasModal').modal('hide'); // fecha modal
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

  alteraResposta (resposta: string) {
	   this.entity.resposta = resposta;
  }
}
