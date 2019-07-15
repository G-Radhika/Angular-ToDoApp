import { Component, OnInit } from '@angular/core';
import { MsgService } from '../msg.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {
  taskList: string[] = [];
  constructor(private msgService: MsgService, private router: Router) {
  }
  ngOnInit() {
    this.msgService.currentMsg.subscribe((task) => {
      if (task && task !== '') {
        this.taskList.push(task);
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.taskList.length; i++){
          // localStorage.setItem('dataSource', this.taskList);
          console.log(this.taskList[i]);
        }

      }
    });
  }

}
