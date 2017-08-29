import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-area-agente',
  templateUrl: './area-agente.component.html',
  styleUrls: ['./area-agente.component.css']
})
export class AreaAgenteComponent implements OnInit {

  constructor(public userService: UserService, private parentRouter: Router) { }

  ngOnInit() {
    console.log('area agente vai verificar se usuario ta logado');
    this.userService.userIsLogged();

    if(this.userService.getUsetData().adm == 'S') {
      this.parentRouter.navigate(['/area-admin/']);
    }
  }

}
