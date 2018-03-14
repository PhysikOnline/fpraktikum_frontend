import { Component, Input, OnInit } from '@angular/core';
import { ChosenPartner } from '../../models/chosen-partner';
import { Partner } from '../../models/partner';

@Component({
  selector: 'app-chosen-partner-info',
  templateUrl: './chosen-partner-info.component.html',
  styleUrls: ['./chosen-partner-info.component.scss'],
})
export class ChosenPartnerInfoComponent implements OnInit {
  chosenPartnerEnum = ChosenPartner;

  @Input() partner: Partner;
  @Input() partnerStatus: ChosenPartner;

  constructor() {}

  ngOnInit() {}
}
