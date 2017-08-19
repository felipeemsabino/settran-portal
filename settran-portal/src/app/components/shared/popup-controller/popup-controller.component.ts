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
  closeButton: boolean;

  constructor() { }

  ngOnInit() {
  }

  showPopupMessage(titulo: string, subtitulo: string, closeButton: boolean){
    $('#titulo-modal-popup').text(titulo);
    $('#subtitulo-modal-popup').text(subtitulo);

    if(closeButton) {
      $('.modal-footer.modal-popup').addClass('show');
    } else {
      $('.modal-footer.modal-popup').addClass('hide');
    }

    $('#loadingModal').modal('show');
  }

  hidePopupMessage(){
    $('#loadingModal').modal('hide');
  }

}
