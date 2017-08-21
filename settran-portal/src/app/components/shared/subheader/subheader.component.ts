import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.css']
})
export class SubheaderComponent implements OnInit {

  tipoUsuario: string = '';
  nomeUsuario: string = '';

  constructor(private userService: UserService) {
    console.log('constructor');
  }

  ngOnInit() {
    this.userService.reloadUserInfos();
    this.tipoUsuario = this.userService.tipoUsuario;
    this.nomeUsuario = this.userService.nomeUsuario;
  }

  logout() {
    this.userService.logout();
  }

}
