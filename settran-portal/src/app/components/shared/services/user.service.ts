import { Injectable } from '@angular/core';
import { PopupControllerComponent } from '../../shared/popup-controller/popup-controller.component';
import { Router }   from '@angular/router';

declare var $:any; // JQUERY

@Injectable()
export class UserService {

  public tipoUsuario: string;
  public nomeUsuario: string;
  public userId: string;
  public user: any = {};

  constructor(private router: Router, private popupController: PopupControllerComponent) {
    console.log('constructor user.service');
  }

  registerLogin(user: any) {

    this.setInfosUsuario(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    //this.setInfosUsuario(user);
    //this.user = user;
  }

  setInfosUsuario(usuario: any) {


    if(usuario.adm == 'S')
      this.tipoUsuario = 'ADM';
    else if(usuario.adm == 'N')
      this.tipoUsuario = 'Agente';

    this.nomeUsuario = usuario.nomeAgente;
    this.userId = usuario.id;
    /*if(this.user.adm == 'S')
      this.tipoUsuario = 'ADM';
    else if(this.user.adm == 'N')
      this.tipoUsuario = 'Agente';

    this.nomeUsuario = this.user.nomeAgente;
    this.userId = this.user.id;*/
  }

  logout() {

    localStorage.clear();
    this.router.navigate(['']);
    //this.user = {};
    //this.router.navigate(['']);
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
    /*if(this.user.id) {
        return true;
      } else {
        this.popupController.showPopupMessage("Atenção!",
        "Você não está conectado. Por favor, realize o login para prosseguir.", true);
        this.router.navigate(['']);
        return false;
      }*/
  }

    getUserName () {

      return JSON.parse(localStorage.getItem('currentUser')).nomeAgente;
      //return this.user.nomeAgente;
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
      /*if (this.user.adm == 'S') {
        return "ADM";
      }
      else if (this.user.adm == 'N') {
        return "Agente"
      } else {
        return "";
      }*/
    }

    getUsetData () {

      return JSON.parse(localStorage.getItem('currentUser'));
      // return this.user;
    }
}
