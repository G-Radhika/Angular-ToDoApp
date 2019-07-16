import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

constructor() { }

/*
- Callbacks
- Promises
- Observables
*/

setData(key: string, value: any): Observable<any> {
  return Observable.create((observer) => {
    localStorage.setItem(key, JSON.stringify(value));
    observer.complete();
  });
}

getData(key: string): Observable<any> {
  return Observable.create((observer) => {
    const data =  localStorage.getItem(key);
    observer.next(JSON.parse(data));
    observer.complete();
  });

}

}
