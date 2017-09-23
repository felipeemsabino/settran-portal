import { Injectable } from '@angular/core';
import { EDATService } from '../../../../shared/services/e-dat.service';
import { Headers, Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class ConfirmacaodatService {

  constructor(private edatService: EDATService, private http: Http) { }
  
  enviarCodigo(params: URLSearchParams): Observable<any []> {
  	let header = new Headers();
	header.append('Content-Type', 'application/json');
	header.append('authorization', 'e96b4ae0-e36a-648f-134f-44171c2dcb18');
    let options = new RequestOptions({ headers: header });

    return this.http.post('http://ec2-54-232-223-144.sa-east-1.compute.amazonaws.com:8080/wsedat/rest/edat/gerarcodigoconfirmacao/', 
						  params, options)
                     .map((res:Response) =>this.extractData(res))
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  
  confirmarCodigo(params: URLSearchParams): Observable<any []> {

	let header = new Headers();
	header.append('Content-Type', 'application/json');
	header.append('authorization', 'e96b4ae0-e36a-648f-134f-44171c2dcb18');
	
    let options = new RequestOptions({ headers: header, search: params });

    return this.http.get('http://ec2-54-232-223-144.sa-east-1.compute.amazonaws.com:8080/wsedat/rest/edat/getconfirmacao/', options)
                     .map((res:Response) =>this.extractData(res))
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  
  extractData(res: Response) {
    return res.json();
  }
}
