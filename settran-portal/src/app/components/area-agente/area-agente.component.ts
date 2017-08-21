import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-area-agente',
  templateUrl: './area-agente.component.html',
  styleUrls: ['./area-agente.component.css']
})
export class AreaAgenteComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.userIsLogged();
  }

}
