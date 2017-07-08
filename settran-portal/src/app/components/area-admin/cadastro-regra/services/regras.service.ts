import { Injectable } from '@angular/core';
import { IDataService } from '../../../interfaces/idata-service'
import { Headers, Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class RegrasService implements IDataService {

  constructor(private http: Http) { }

  getData(params: URLSearchParams): Observable<any []> {
	let header = new Headers();
	header.append('Content-Type', 'application/json');
	header.append('authorization', 'e96b4ae0-e36a-648f-134f-44171c2dcb18');
    let options = new RequestOptions({ headers: header, search: params });

    return this.http.get('http://ec2-52-67-135-39.sa-east-1.compute.amazonaws.com:8080/wsedat/rest/regrasdevalidacao/listaregrasdevalidacao/',
							options)
                     .map((res:Response) =>this.extractData(res))
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  
  saveData(params: URLSearchParams): Observable<any []> {
  	let header = new Headers();
	header.append('Content-Type', 'application/json');
	header.append('authorization', 'e96b4ae0-e36a-648f-134f-44171c2dcb18');
    let options = new RequestOptions({ headers: header });

    return this.http.post('http://ec2-52-67-135-39.sa-east-1.compute.amazonaws.com:8080/wsedat/rest/regrasdevalidacao/cadastrarregradevalidacao/',
							params, options)
                     .map((res:Response) =>this.extractData(res))
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  
  deleteData(dataId: any): Observable<any []>  {
	let header = new Headers();
	header.append('Content-Type', 'application/json');
	header.append('authorization', 'e96b4ae0-e36a-648f-134f-44171c2dcb18');
    let options = new RequestOptions({ headers: header });
	
	return this.http.delete('http://ec2-52-67-135-39.sa-east-1.compute.amazonaws.com:8080/wsedat/rest/regrasdevalidacao/deletaregradevalidacao/'+dataId,
							options)
                     .map((res:Response) =>this.extractData(res))
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  
  reorderData(params: URLSearchParams): Observable<any []> {
  	let header = new Headers();
	header.append('Content-Type', 'application/json');
	header.append('authorization', 'e96b4ae0-e36a-648f-134f-44171c2dcb18');
    let options = new RequestOptions({ headers: header, search: params });
	
    return this.http.put('http://ec2-52-67-135-39.sa-east-1.compute.amazonaws.com:8080/wsedat/rest/regrasdevalidacao/reordenarregrasvalidacao/',
							options)
                     .map((res:Response) =>this.extractData(res))
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  
  extractData(res: Response) {
    return res.json();
  }
}