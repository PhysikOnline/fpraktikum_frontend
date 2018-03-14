import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.scss']
})
export class InfoBoxComponent implements OnInit {

  public title: string;
  public content: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = this.data.title;
    this.content = this.data.content;
  }

  ngOnInit() {
  }

}
