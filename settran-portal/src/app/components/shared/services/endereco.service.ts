import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Globals } from '../../shared/globals';

@Injectable()
export class EnderecoService {

  constructor(private http: Http, private globals: Globals) { }

  getCEP (params: URLSearchParams) {
  	let header = new Headers();
	header.append('Content-Type', 'application/json');
	header.append('authorization', this.globals.authorization);
    let options = new RequestOptions({ headers: header, search: params });

    return this.http.get(this.globals.baseURL + 'logradouroservice/recuperalogradourocep',
							options)
                     .map((res:Response) =>this.extractData(res))
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  extractData(res: Response) {
    return res.json();
  }

}
