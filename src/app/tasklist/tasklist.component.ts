import { Component, OnInit } from '@angular/core';
import { MsgService } from '../msg.service';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
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
    private angularFireStore: AngularFirestore // inject AngularFirestore.(Service)
    ) {
    this.taskListObs = angularFireStore.collection('taskList').snapshotChanges();
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
    this.taskListObs.subscribe( (allDocs: any[]) => {
      allDocs.forEach( (doc: any) => {
        const taskName = doc.payload.doc.id;
        this.taskList.push(taskName);
      });
    } );
    // Add document to firestore.
  }
}
