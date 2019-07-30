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
// export interface Task { name: string; }

export class TasklistComponent implements OnInit {
  taskList: string[] = [];
  taskListObs: Observable<any[]>;

  // private taskCollection: AngularFirestoreCollection<Task>;

  constructor(
    private msgService: MsgService, // service is injected. NOW READ AND WRITE.
    private router: Router,
    private aFS: AngularFirestore // inject AngularFirestore.(Service)
  ) {
    this.taskListObs = aFS.collection('taskList').snapshotChanges();
  }
  ngOnInit() {
    // tslint:disable-next-line: deprecation
    this.msgService.currentMsg.subscribe((task) => {
      if (task && task !== '') {
        // check taskList for duplicate entries.
        if (this.taskList.includes(task)) {
          const msg = 'Duplicate task!';
          console.log(msg);
          // msgDisplay(msg);
        } else {
          this.taskList.push(task);
          // Save this data to angularFirebase.
          console.log('taskList : ', this.taskList);
          // add this task to taskList collection on fireStore.
          /*
           addItem(item: Item) {
            this.itemsCollection.add(item);
            } */
          // this.taskCollection.add(this.task);
        }
      }
    });
    this.taskListObs.subscribe((allDocs: any[]) => {
      allDocs.forEach((doc: any) => {
        const taskName = doc.payload.doc.id;
        this.taskList.push(taskName);
        // this.angularFireStore.collection('taskList').add(taskName);
      });
    });
    // Add document to firestore.
  }
}
