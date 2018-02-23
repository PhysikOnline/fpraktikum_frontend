import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { RegistrationService } from '../../services/registration.service';
import { MetaInfoState } from '../../registration/store/reducers/meta-info.reducer';

@Component({
  selector: 'app-user-info-list',
  templateUrl: './user-info-list.component.html',
  styleUrls: ['./user-info-list.component.scss'],
})
export class UserInfoListComponent implements OnInit {
  @Input() info: MetaInfoState;

  constructor() {}

  ngOnInit() {}
}
