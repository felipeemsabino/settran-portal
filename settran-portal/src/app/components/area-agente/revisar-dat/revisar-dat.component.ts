import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-revisar-dat',
  templateUrl: './revisar-dat.component.html',
  styleUrls: ['./revisar-dat.component.css']
})
export class RevisarDatComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.userIsLogged();
  }

}
