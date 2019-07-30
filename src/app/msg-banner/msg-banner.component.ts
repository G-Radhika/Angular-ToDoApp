import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-msg-banner',
  templateUrl: './msg-banner.component.html',
  styleUrls: ['./msg-banner.component.css']
})
export class MsgBannerComponent implements OnInit {
  @Input() msg: string;

  constructor() { }

  ngOnInit() {
    console.log(this.msg);
  }
}
