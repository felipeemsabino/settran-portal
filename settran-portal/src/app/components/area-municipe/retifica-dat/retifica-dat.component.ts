import { Component, OnInit } from '@angular/core';
import { PopupControllerComponent } from '../../shared/popup-controller/popup-controller.component';

declare var $:any; // JQUERY


@Component({
  selector: 'app-retifica-dat',
  templateUrl: './retifica-dat.component.html',
  styleUrls: ['./retifica-dat.component.css']
})
export class RetificaDatComponent implements OnInit {

  constructor(private popupController: PopupControllerComponent) { }

  ngOnInit() {
    var me = this;
     $( "#alertDialogText" ).dialog({
       title:"Alerta",
       modal: true,
       dialogClass: "no-close",
       buttons: [
         {
           text: "Ok",
           click: function() {
            window.open('http://ec2-52-67-135-39.sa-east-1.compute.amazonaws.com:8080/wsedat/rel/retificacaodat.pdf', "_blank");
             $( this ).dialog( "close" );
           }
         }
       ]
     }).text("Para solicitar a retificação de uma DAT imprima, preencha e entregue esse requerimento na SETTRAN.");
  }

}
