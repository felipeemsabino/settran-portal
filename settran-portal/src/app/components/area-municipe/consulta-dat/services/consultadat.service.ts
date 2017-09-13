import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class ConsultadatService {

  constructor(private http: Http) { }

  consultaDat(params: URLSearchParams): Observable<any> {

	let header = new Headers();
	header.append('Content-Type', 'application/json');
	header.append('authorization', 'e96b4ae0-e36a-648f-134f-44171c2dcb18');

    let options = new RequestOptions({ headers: header, search: params });

    return this.http.get('http://ec2-52-67-135-39.sa-east-1.compute.amazonaws.com:8080/wsedat/rest/edat/consultadat/', options)
                        .map((res:Response) =>this.extractData(res))
                        .catch((error: any) => {
                          if(error.status == 400 || error.status == 404){
                            return [error];
                          } else {
                           return Observable.arguments(new Error(error));
                          }
                       });
  }

  recarregarCaptcha(): Observable<any []> {

    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('authorization', 'e96b4ae0-e36a-648f-134f-44171c2dcb18');

    let options = new RequestOptions({ headers: header });

    return this.http.get('http://ec2-52-67-135-39.sa-east-1.compute.amazonaws.com:8080/wsedat/rest/edat/getcaptcha/', options)
                     .map((res:Response) =>this.extractData(res))
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  extractData(res: Response) {
    return res.json();
  }
}
