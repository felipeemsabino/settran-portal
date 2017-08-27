import { Injectable } from '@angular/core';
import { PopupControllerComponent } from '../../shared/popup-controller/popup-controller.component';
import { Router }   from '@angular/router';

declare var $:any; // JQUERY

@Injectable()
export class UserService {

  public tipoUsuario: string;
  public nomeUsuario: string;
  public userId: string;

  constructor(private router: Router, private popupController: PopupControllerComponent) {
  }

  registerLogin(user: any) {
    this.setInfosUsuario(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  setInfosUsuario(usuario: any) {
    if(usuario.adm == 'S')
      this.tipoUsuario = 'ADM';
    else if(usuario.adm == 'N')
      this.tipoUsuario = 'Agente';

    this.nomeUsuario = usuario.nomeAgente;
    this.userId = usuario.id;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  userIsLogged() {
    if(localStorage.getItem('currentUser')) {
      return true;
    } else {
      this.popupController.showPopupMessage("Atenção!",
      "Você não está conectado. Por favor, realize o login para prosseguir.", true);
      this.router.navigate(['']);
      return false;
    }
  }

    getUserName () {
      return JSON.parse(localStorage.getItem('currentUser')).nomeAgente;
    }

    getUserPerfil () {
      if (JSON.parse(localStorage.getItem('currentUser')).adm == 'S') {
        return "ADM";
      }
      else if (JSON.parse(localStorage.getItem('currentUser')).adm == 'N') {
        return "Agente"
      } else {
        return "";
      }
    }

    getUsetData () {
      return JSON.parse(localStorage.getItem('currentUser'));
    }
}
