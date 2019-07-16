import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// used to communicate between components.
@Injectable({
  providedIn: 'root'
})
export class MsgService {

  private msgSource = new BehaviorSubject('');
  currentMsg = this.msgSource.asObservable();
  constructor() { }

  changeMessage(message: string) {
    this.msgSource.next(message);
  }

}
