import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-registration-complete',
  templateUrl: './registration-complete.component.html',
  styleUrls: ['./registration-complete.component.scss']
})
export class RegistrationCompleteComponent implements OnInit {
  hasPartner = false;

  constructor(public registrationService: RegistrationService) { }

  ngOnInit() {
    this.hasPartner = !!this.registrationService.user.partner;
  }

}
