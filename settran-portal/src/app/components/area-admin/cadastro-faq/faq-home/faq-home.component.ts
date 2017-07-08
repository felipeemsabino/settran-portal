import { Component, OnInit } from '@angular/core';
import { FaqService } from '../services/faq.service';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-faq-home',
  templateUrl: './faq-home.component.html',
  styleUrls: ['./faq-home.component.css'],
  providers: [FaqService]
})
export class FaqHomeComponent implements OnInit {

  constructor(private faqService: FaqService) { 
  console.log('constructor');
  }
  params: URLSearchParams;
  fetchedData: any;
  retornoQtdRestante: any;
  
  ngOnInit() {
	this.getData();console.log('ngoninit');
  }
  
  getData() {	
  	this.setUrlParams();

    this.faqService.getData(this.params)
                      .subscribe(
                          result => {
							//this.retornoQtdRestante = Number((<any>result.pop()).split(":")[1].replace("}",""));
                            this.fetchedData = result;
                          }, //Bind to view
                          err => {
                            console.log(err);
                          });
  }
  setUrlParams() {
	this.params = new URLSearchParams();
  }
}
