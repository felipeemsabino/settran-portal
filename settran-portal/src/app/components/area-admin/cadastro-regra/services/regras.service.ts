import { Injectable } from '@angular/core';
import { IDataService } from '../../../interfaces/idata-service'
import { Headers, Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Globals } from '../../../shared/globals';

@Injectable()
export class RegrasService implements IDataService {

  constructor(private http: Http, private globals: Globals) { }

  getData(params: URLSearchParams): Observable<any []> {
	let header = new Headers();
	header.append('Content-Type', 'application/json');
	header.append('authorization', this.globals.authorization);
    let options = new RequestOptions({ headers: header, search: params });

    return this.http.get(this.globals.baseURL+'regrasdevalidacao/listaregrasdevalidacao/',
							options)
                     .map((res:Response) =>this.extractData(res))
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  saveData(params: URLSearchParams): Observable<any []> {
  	let header = new Headers();
	header.append('Content-Type', 'application/json');
	header.append('authorization', this.globals.authorization);
    let options = new RequestOptions({ headers: header });

    return this.http.post(this.globals.baseURL+'regrasdevalidacao/cadastrarregradevalidacao/',
							params, options)
                     .map((res:Response) =>this.extractData(res))
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteData(dataId: any): Observable<any []>  {
	let header = new Headers();
	header.append('Content-Type', 'application/json');
	header.append('authorization', this.globals.authorization);
    let options = new RequestOptions({ headers: header });

	return this.http.delete(this.globals.baseURL+'regrasdevalidacao/deletaregradevalidacao/'+dataId,
							options)
                     .map((res:Response) =>this.extractData(res))
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  reorderData(body: string): Observable<any []> {
  	let header = new Headers();
	header.append('Content-Type', 'application/json');
	header.append('authorization', this.globals.authorization);
    let options = new RequestOptions({ headers: header });

    return this.http.put(this.globals.baseURL+'regrasdevalidacao/reordenarregrasvalidacao/',
							body, options)
                     .map((res:Response) =>this.extractData(res))
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  extractData(res: Response) {
    return res.json();
  }
}
