import { Component, OnInit, Input } from '@angular/core';
import { MetaInfoState } from '../../registration/store/reducers/meta-info.reducer';
import { User } from '../../models/user';
import { USER_TYPE } from '../../models/user-type';
import { GRADUATION } from '../../../config';

@Component({
  selector: 'app-info-list',
  templateUrl: './info-list.component.html',
  styleUrls: ['./info-list.component.scss'],
})
export class InfoListComponent implements OnInit {
  @Input() info: MetaInfoState;
  @Input() user: User;
  @Input() partner: User;
  userType = USER_TYPE;
  graduation = GRADUATION;

  get institutes() {
    const userInstitutes = this.user ? this.user.institutes : null;
    const selectedInstitutes = this.info ? this.info.selectedInstitutes : null;

    const institutes = userInstitutes || selectedInstitutes || [];
    return institutes.sort((a, b) => {
      return a.semesterHalf - b.semesterHalf;
    });
  }

  constructor() {}

  ngOnInit() {}
}
