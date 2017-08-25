import { Component, OnInit, Input } from '@angular/core';

declare var $:any; // JQUERY

@Component({
  selector: 'app-popup-controller',
  templateUrl: './popup-controller.component.html',
  styleUrls: ['./popup-controller.component.css']
})
export class PopupControllerComponent implements OnInit {

  titulo: string = "a";
  subtitulo: string = "a";

  constructor() { }

  ngOnInit() {
  }

  showPopupMessage(titulo: string, subtitulo: string, closeButton: boolean){
    $('#titulo-modal-popup').text(titulo);
    $('#subtitulo-modal-popup').text(subtitulo);

    if(closeButton) {
      $('.modal-footer.modal-popup').removeClass('hide');
      $('.modal-footer.modal-popup').addClass('show');
      $('.modal-body.modal-loading').removeClass('show');
      $('.modal-body.modal-loading').addClass('hide');
    } else {
      $('.modal-footer.modal-popup').removeClass('show');
        $('.modal-footer.modal-popup').addClass('hide');
      $('.modal-body.modal-loading').removeClass('hide');
      $('.modal-body.modal-loading').addClass('show');
    }

    $('#loadingModal').modal('show');
  }

  hidePopupMessage(){
    $('#loadingModal').modal('hide');
  }
}
