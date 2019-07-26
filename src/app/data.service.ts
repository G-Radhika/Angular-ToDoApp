import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  setData(key: string, value: any): Observable<any> {
    // tslint:disable-next-line: deprecation
    return Observable.create((observer) => {
      localStorage.setItem(key, JSON.stringify(value));
      observer.complete();
    });
  }

  getData(key: string): Observable<any> {
    // tslint:disable-next-line: deprecation
    return Observable.create((observer) => {
      const data = localStorage.getItem(key);
      observer.next(JSON.parse(data));
      observer.complete();
    });

  }

}
