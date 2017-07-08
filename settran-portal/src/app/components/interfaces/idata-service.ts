import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export interface IDataService {

  getData(params: URLSearchParams): Observable<any []>
  saveData(params: URLSearchParams): Observable<any []>
  deleteData(dataId: any): Observable<any []>
  reorderData(params: URLSearchParams): Observable<any []>
}
