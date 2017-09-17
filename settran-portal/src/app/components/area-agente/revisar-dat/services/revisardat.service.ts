import { Injectable } from '@angular/core';
import { IDataService } from '../../../interfaces/idata-service'
import { Headers, Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Globals } from '../../../shared/globals';

@Injectable()
export class RevisardatService {

  constructor(private http: Http, private globals: Globals) { }

  getData(params: URLSearchParams): Observable<any []> {

	let header = new Headers();
	header.append('Content-Type', 'application/json');
	header.append('authorization', this.globals.authorization);

    let options = new RequestOptions({ headers: header, search: params });
    //return this.http.get(this.globals.baseURL + 'edat/listaedatnaovalidadas/', options)
    return this.http.get(this.globals.baseURL + 'edat/consultardatrevisao/', options)
                     .map((res:Response) =>this.extractData(res))
                     .catch((error: any) => {
                       if(error.status == 400 || error.status == 404){
                         return [error];
                       } else {
                        return Observable.arguments(new Error(error));
                       }
                    });
  }

  saveData(params: URLSearchParams): Observable<any> {
  	let header = new Headers();
  	header.append('Content-Type', 'application/json');
  	header.append('authorization', this.globals.authorization);
    let options = new RequestOptions({ headers: header });

    return this.http.post(this.globals.baseURL + 'edat/revisardat/',
							params, options)
                     .map((res:Response) =>this.extractData(res))
                     .catch((error: any) => {
                       if(error.status == 400){
                         return [error];
                       } else {
                        return Observable.arguments(new Error(error));
                       }
                    });
  }

  extractData(res: Response) {
    return res.json();
  }
}
