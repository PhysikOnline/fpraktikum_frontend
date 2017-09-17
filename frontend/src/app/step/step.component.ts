import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {
  @Input() progressValue = 10;
  @Input() nextButtonName = 'Next';
  @Input() backButtonName = 'Back';
  @Input() resetButtonName = '';
  @Input() stepName = 'Step';
  @Input() nextDisables = false;
  @Input() stepActionHtml: string;

  @Output() stepNext = new EventEmitter();
  @Output() stepBack = new EventEmitter();
  @Output() reset = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
