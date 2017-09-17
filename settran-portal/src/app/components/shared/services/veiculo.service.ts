import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Globals } from '../../shared/globals';

@Injectable()
export class VeiculoService {

  constructor(private http: Http, private globals: Globals) { }

  getTiposVeiculo (params: URLSearchParams) {
  	let header = new Headers();
	header.append('Content-Type', 'application/json');
	header.append('authorization', this.globals.authorization);
    let options = new RequestOptions({ headers: header, search: params });

    return this.http.get(this.globals.baseURL + 'edat/listatiposveiculo/',
							options)
                     .map((res:Response) =>this.extractData(res))
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getMarcasVeiculo(descTipoVeiculo: string) {
	let header = new Headers();
	header.append('Content-Type', 'application/json');
	header.append('authorization', this.globals.authorization);
    let options = new RequestOptions({ headers: header });

    /*return this.http.get('http://fipeapi.appspot.com/api/1/'+descTipoVeiculo+'/marcas.json',
							options)
                     .map((res:Response) =>this.extractData(res))
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));*/
	console.log('descTipoVeiculo -> ' + descTipoVeiculo);
    return this.http.get(this.globals.baseURL + 'edat/getmarcas?tipoveiculo='+descTipoVeiculo,
							options)
                     .map((res:Response) =>this.extractData(res))
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));


  }

  getModelosVeiculo(descTipoVeiculo: string, idMarcaVeiculo: string) {
	let header = new Headers();
	header.append('Content-Type', 'application/json');
	header.append('authorization', this.globals.authorization);
    let options = new RequestOptions({ headers: header });

    /*return this.http.get('http://fipeapi.appspot.com/api/1/'+descTipoVeiculo+'/veiculos/'+idMarcaVeiculo+'.json',
							options)
                     .map((res:Response) =>this.extractData(res))
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));*/

	console.log('descTipoVeiculo -> ' + descTipoVeiculo);
	console.log('idMarcaVeiculo -> ' + idMarcaVeiculo);
	return this.http.get(this.globals.baseURL + 'edat/getmodelos?tipoveiculo='+descTipoVeiculo+'&idmarca='+idMarcaVeiculo,
							options)
                     .map((res:Response) =>this.extractData(res))
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  extractData(res: Response) {
    return res.json();
  }
}
