import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-registered-info',
  templateUrl: './registered-info.component.html',
  styleUrls: ['./registered-info.component.scss']
})
export class RegisteredInfoComponent implements OnInit {
  user: User;

  constructor(private registrationService: RegistrationService) { }

  ngOnInit() {
    this.user = this.registrationService.user;
  }

  signOut() {
    this.registrationService.signOutUser().subscribe(() => {

    })
  }
}
