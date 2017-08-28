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

  constructor(public userService: UserService) {
  }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
  }

}
