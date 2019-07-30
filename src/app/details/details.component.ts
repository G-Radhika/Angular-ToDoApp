import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TaskDetails } from '../TaskDetails';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  id: string;
  docRef: any;
  taskDetailsObs: Observable<any[]>;
  formDetails = new FormGroup({
    formTextDetails: new FormControl(),
    formStartDate: new FormControl(),
    formEndDate: new FormControl()
  });
  message: string;
  taskDetails: TaskDetails;

  // details observable}}} subscribe and print!!!!
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private angularFireStore: AngularFirestore // inject AngularFirestore.(Service)
  ) {
    // from firestore read the document belonging to a perticular task.

  /* this.itemscollection.doc(id).ref.get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
      } else {
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    }); */
  }


  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    console.log('this is detail oninit');
    this.route.params.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      this.id = params['id']; // (+) converts string 'id' to a number
      this.docRef = this.angularFireStore.collection('taskList').doc(this.id).ref;
      this.docRef.get().then((doc) => {
        if (doc.exists && doc.data() && doc.data().details) {
          console.log('Document data:', doc.data());
          const data = doc.data();


          this.formDetails.setValue({
            formTextDetails: data.details,
            formStartDate: new Date(data.startDate),
            formEndDate: new Date(data.endDate)
          });
        } else {
          console.log('No such document!');
        }
      }).catch((error) =>  {
        console.log('Error getting document:', error);
      });
    });
  }
  onFormSubmit() {
    const formDetailsValue = this.formDetails.value;
    console.log(formDetailsValue);
    const taskObj: TaskDetails = {
      details: formDetailsValue.formTextDetails,
      startDate: new Date(formDetailsValue.formStartDate),
      endDate: new Date(formDetailsValue.formEndDate)
    };

    this.docRef.set(taskObj)
      .then((status) => {
        console.log('in success');
      }).catch((error: any) => {
        console.log(error);
      });

    this.dataService.setData('dataSource', taskObj).subscribe(() => {
      console.log('done saving');
    });
    this.dataService.getData('dataSource').subscribe((data) => {
      console.log(data.taskDetails);
      console.log(data.taskStartDate);
      console.log(data.taskEndDate);
    });
  }

  backHome(task: any) {
    console.log(task);
    this.router.navigate(['/todo']);
  }
}
