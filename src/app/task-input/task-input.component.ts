import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MsgService } from '../msg.service';

@Component({
  selector: 'app-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.css']
})

export class TaskInputComponent implements OnInit {
  task = new FormControl('');
  message: string;
  form: any;
  constructor(private msgService: MsgService) {
  }
  ngOnInit() { }

  updateTask() {
    this.msgService.changeMessage(this.task.value);
    this.task.reset(); // [formControl] = task;
  }
}
