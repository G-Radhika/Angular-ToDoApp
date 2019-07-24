import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  private sub: any;
  id: string;
  formDetails = new FormGroup({
    formTextDetails: new FormControl(''),
    formStartDate: new FormControl(''),
    formEndDate: new FormControl('')
  });
  message: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService ) {
  }

  // tslint:disable-next-line: use-life-cycle-interface
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    console.log('this is detail oninit');
    this.sub = this.route.params.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      this.id = params['id']; // (+) converts string 'id' to a number
    });
  }

  onFormSubmit() {
    const formDetailsValue = this.formDetails.value;
    console.log(formDetailsValue);

    this.dataService.setData('dataSource', {
      taskDetails: formDetailsValue.formTextDetails,
      taskStartDate: formDetailsValue.formStartDate,
      taskEndDate: formDetailsValue.formEndDate
    }).subscribe( () => {
      console.log('done saving');
    });
    this.dataService.getData('dataSource').subscribe( (data) => {
      console.log(data.taskDetails);
      console.log(data.taskStartDate);
      console.log(data.taskEndDate);
    });


  }


  toTodo(task: any) {
    console.log(task);
    this.router.navigate(['/todo']);
  }

  startDate() {
    // this.msgService.changeMessage(this.startDate.value);
  }

  endDate() {
    console.log('clicked!');
  }
}
