import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-area-admin',
  templateUrl: './area-admin.component.html',
  styleUrls: ['./area-admin.component.css']
})
export class AreaAdminComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.userIsLogged();
  }

}
