import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class LoginService {

  constructor(private http: Http) { }

  realizaLogin(params: URLSearchParams): Observable<any> {

    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('authorization', 'e96b4ae0-e36a-648f-134f-44171c2dcb18');

    let options = new RequestOptions({ headers: header, search: params });

    return this.http.get('http://ec2-52-67-135-39.sa-east-1.compute.amazonaws.com:8080/wsedat/rest/agente/login/', options)
                     .map((res:Response) =>this.extractData(res))
                     .catch((error: any) => {
                       if(error.status == 404){
                         return [error];
                       } else {
                        return Observable.arguments(new Error(error));
                       }
                    });
  }

  recuperarSenha(params: URLSearchParams): Observable<any> {

    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('authorization', 'e96b4ae0-e36a-648f-134f-44171c2dcb18');

    let options = new RequestOptions({ headers: header, search: params });

    return this.http.get('http://ec2-52-67-135-39.sa-east-1.compute.amazonaws.com:8080/wsedat/rest/agente/recuperasenha/', options)
                     .map((res:Response) =>this.extractData(res))
                     .catch((error: any) => {
                       if(error.status == 404){
                         return [error];
                       } else {
                        return Observable.arguments(new Error(error));
                       }
                    });  }

  extractData(res: Response) {
    return res.json();
  }

}
