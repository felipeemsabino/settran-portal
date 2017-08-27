import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-area-agente',
  templateUrl: './area-agente.component.html',
  styleUrls: ['./area-agente.component.css']
})
export class AreaAgenteComponent implements OnInit {

  constructor(private userService: UserService, private parentRouter: Router) { }

  ngOnInit() {
    this.userService.userIsLogged();

    if(this.userService.getUsetData().adm == 'S') {
      this.parentRouter.navigate(['/area-admin/']);
    }
  }

}
