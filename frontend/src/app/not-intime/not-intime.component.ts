import { Component, Input, OnInit } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { User } from '../../models/user';
import { InTime } from '../../models/in-time';

@Component({
  selector: 'app-not-intime',
  templateUrl: './not-intime.component.html',
  styleUrls: ['./not-intime.component.scss']
})
export class NotIntimeComponent implements OnInit {
  @Input() set tooLate(tooLate: InTime) {
    this.isTooLate = tooLate === InTime.tooLate;
    const date = this.isTooLate ? this.registrationService.date.end : this.registrationService.date.start;
    this.date = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
  };
  isTooLate: boolean;
  date: string;
  user: User;

  constructor(private registrationService: RegistrationService) {
    this.user = registrationService.user;
  }

  ngOnInit() {
  }

}
