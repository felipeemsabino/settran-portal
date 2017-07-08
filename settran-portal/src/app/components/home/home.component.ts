import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router }   from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

	registerCredentials = {user: '', pass: ''};

  entrar () {
	if(this.registerCredentials.user === 'agente' && this.registerCredentials.user === 'agente')
    {
      this.router.navigate(['/area-agente']);
    } else if(this.registerCredentials.user === 'admin' && this.registerCredentials.user === 'admin')
    {
      this.router.navigate(['/area-admin']);
    }
  }
}
