import { Component, OnInit } from '@angular/core';
import { MsgService } from '../msg.service';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})

export class TasklistComponent implements OnInit {
  taskList: string[] = [];

  taskListObs: Observable<any[]>;
  constructor(
    private msgService: MsgService, // service is injected. NOW READ AND WRITE.
    private router: Router,
    db: AngularFirestore // inject AngularFirestore.(Service)
    ) {
    this.taskListObs = db.collection('taskList').valueChanges();
  }



  ngOnInit() {
    // tslint:disable-next-line: deprecation
    this.msgService.currentMsg.subscribe((task) => {
      if (task && task !== '') {
        this.taskList.push(task);
        // Save this data to angularFirebase.
        console.log('taskList : ', this.taskList);
      }
    });
  }
}
