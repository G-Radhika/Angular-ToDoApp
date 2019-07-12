import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
