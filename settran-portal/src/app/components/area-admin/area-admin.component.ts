import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-area-admin',
  templateUrl: './area-admin.component.html',
  styleUrls: ['./area-admin.component.css']
})
export class AreaAdminComponent implements OnInit {

  constructor(private userService: UserService, private parentRouter: Router) { }

  ngOnInit() {
    this.userService.userIsLogged();
    
    if(this.userService.getUsetData().adm == 'N') {
      this.parentRouter.navigate(['/area-agente/']);
    }
  }

}
