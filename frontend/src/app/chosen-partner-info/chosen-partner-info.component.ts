import { Component, Input, OnInit } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { ChosenPartner } from '../../models/chosen-partner';

@Component({
  selector: 'app-chosen-partner-info',
  templateUrl: './chosen-partner-info.component.html',
  styleUrls: ['./chosen-partner-info.component.scss']
})
export class ChosenPartnerInfoComponent implements OnInit {

  chosenPartnerEnum = ChosenPartner;

  constructor(public registrationService: RegistrationService) {
  }

  ngOnInit() {
  }

}
