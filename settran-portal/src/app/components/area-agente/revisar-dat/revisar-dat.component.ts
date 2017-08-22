import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, NavigationExtras } from '@angular/router';
import { PopupControllerComponent } from '../../shared/popup-controller/popup-controller.component';
import { VisualizarDatComponent } from '../../shared/visualizar-dat/visualizar-dat.component';
import { EdatStorageService } from '../../shared/services/edat-storage.service';
import { EDATService } from '../../shared/services/e-dat.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-revisar-dat',
  templateUrl: './revisar-dat.component.html',
  styleUrls: ['./revisar-dat.component.css']
})
export class RevisarDatComponent implements OnInit {
  gridTitle: string = "Revisar eDAT";
  object: any = {};
  mostrarGrid: boolean = true;
  sub: any;

  constructor(private parentRouter: Router, private edatStorage: EdatStorageService,
   public edatService: EDATService, private userService: UserService) {

  }

  alteraSituacaoDAT(situacao: string) {

  }

  ngOnInit() {
    this.userService.userIsLogged();
  }

  cancelar() {
    this.mostrarGrid = true;
    this.parentRouter.navigate(['area-agente/revisar-dat']);
  }

  validarDAT() {

  }

  public updateObjectParameter(edatObject: any):void {
	   this.object = edatObject;
     this.mostrarGrid = false;
     this.edatService.limparDados();
     this.edatService.eDAT = edatObject;
     this.edatService.habilitarEdicaoCampos();

     if(!this.edatService.eDAT.situacaoDat)
      this.edatService.eDAT.situacaoDat = '';

     if(!this.edatService.eDAT.textoValidacao)
      this.edatService.eDAT.textoValidacao = '';

     if(!this.edatService.eDAT.usuarioAgente)
      this.edatService.eDAT.agente = { 'id':'' };

      if(!this.edatService.eDAT.acidenteDat[0].logradouroCruzamento) {
        this.edatService.eDAT.acidenteDat[0].logradouroCruzamento = {
          "id":"",
          "nomeLogradouro":"",
          "tipoLogradouro":""
        };
      }
      
     this.parentRouter.navigate(['/area-agente/revisar-dat/visualizar-dat/']);
  }
}
