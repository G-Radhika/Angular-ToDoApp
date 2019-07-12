import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute) {
  }

  // tslint:disable-next-line: use-life-cycle-interface
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
