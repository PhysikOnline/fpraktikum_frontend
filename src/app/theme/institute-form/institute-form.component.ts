import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  OnDestroy,
  ChangeDetectionStrategy,
  Output,
} from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';
import { Institute } from '../../models/institute';
import { GRADUATION } from '../../../config';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-institute-form',
  templateUrl: './institute-form.component.html',
  styleUrls: ['./institute-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstituteFormComponent implements OnInit, OnDestroy {
  @Input() institutes: Institute[];
  @Input()
  set graduation(g: GRADUATION) {
    this._graduation = g;
    if (this.chooseOnlyOneInstitute()) {
      this.institutesForm = this.formBuilder.group({
        institutes: ['', Validators.required],
      });
    } else {
      this.institutesForm = this.formBuilder.group({
        institutes1: ['', Validators.required],
        institutes2: ['', Validators.required],
      });
    }
  }
  @Input() selectedInstitutes: Institute[] = [];
  @Output() institutesSelected = new EventEmitter<Institute[]>();

  public _graduation: GRADUATION;
  private sub = new Subscription();
  private set sink(sub: Subscription) {
    this.sub.add(sub);
  }

  institutesForm: FormGroup;
  readonly institutesSelect: ReplaySubject<Institute> = new ReplaySubject(1);

  constructor(private formBuilder: FormBuilder) {
    this.sink = this.institutesSelect.subscribe(institute => {
      if (this.chooseOnlyOneInstitute()) {
        this.institutesSelected.emit([institute]);
      } else {
        const index = this.selectedInstitutes.findIndex(
          i => i.semesterHalf === institute.semesterHalf
        );
        if (index > -1) {
          this.selectedInstitutes[index] = institute;
        } else {
          this.selectedInstitutes.push(institute);
        }
        this.institutesSelected.emit(this.selectedInstitutes);
      }
    });
  }

  shouldOptionBeDisabled(instituteName, semesterHalf) {
    const otherHalf = semesterHalf % 2 + 1;
    return !!this.selectedInstitutes
      .filter(i => !!i)
      .find(i => i.name === instituteName && i.semesterHalf === otherHalf);
  }

  isInstituteChecked(i: Institute): boolean {
    return this.selectedInstitutes.indexOf(i) > -1;
  }

  readonly chooseOnlyOneInstitute = () => this._graduation === GRADUATION.LA;

  ngOnInit() {}
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
