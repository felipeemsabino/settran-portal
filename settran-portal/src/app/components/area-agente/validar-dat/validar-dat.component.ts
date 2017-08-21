import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, NavigationExtras } from '@angular/router';
import { PopupControllerComponent } from '../../shared/popup-controller/popup-controller.component';
import { VisualizarDatComponent } from '../../shared/visualizar-dat/visualizar-dat.component';
import { EdatStorageService } from '../../shared/services/edat-storage.service';
import { EDATService } from '../../shared/services/e-dat.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-validar-dat',
  templateUrl: './validar-dat.component.html',
  styleUrls: ['./validar-dat.component.css']
})
export class ValidarDatComponent implements OnInit {
  gridTitle: string = "Validar eDAT";
  object: any = {};
  mostrarGrid: boolean = true;
  sub: any;

  constructor(private parentRouter: Router, private edatStorage: EdatStorageService,
   private edatService: EDATService, private userService: UserService) {

  }

  ngOnInit() {
    this.userService.userIsLogged();
  }

  cancelar() {
    this.mostrarGrid = true;
    this.parentRouter.navigate(['area-agente/validar-dat']);
  }

  validarDAT() {

  }

  public updateObjectParameter(edatObject: any):void {
	   this.object = edatObject;
     this.mostrarGrid = false;
     this.edatService.limparDados();
     this.edatService.eDAT = edatObject;
     this.edatService.validar = false;
     this.parentRouter.navigate(['area-agente/validar-dat/visualizar-dat']);
  }

}
