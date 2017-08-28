import { Component, Input, OnInit } from '@angular/core';
import { UserInterface } from '../interfaces/user.interface';

@Component({
  selector: 'app-user-info-list',
  templateUrl: './user-info-list.component.html',
  styleUrls: ['./user-info-list.component.scss']
})
export class UserInfoListComponent implements OnInit {
  @Input() user: UserInterface;

  constructor() { }

  ngOnInit() {
  }

}
