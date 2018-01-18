import { Component, Input, OnInit } from '@angular/core';
import { ChosenPartner } from '../../models/chosen-partner';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-chosen-partner-info',
  templateUrl: './chosen-partner-info.component.html',
  styleUrls: ['./chosen-partner-info.component.scss'],
})
export class ChosenPartnerInfoComponent implements OnInit {
  chosenPartnerEnum = ChosenPartner;

  constructor(public registrationService: RegistrationService) {}

  ngOnInit() {}
}
