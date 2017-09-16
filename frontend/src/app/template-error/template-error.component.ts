import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-error',
  templateUrl: './template-error.component.html',
  styleUrls: ['./template-error.component.scss']
})
export class TemplateErrorComponent implements OnInit {

  @Input() error: string;

  constructor() { }

  ngOnInit() {
  }

}
