import { Component, OnInit } from '@angular/core';
import { InfoBoxComponent } from '../info-box-dialog/info-box.component';
import { MdDialog } from '@angular/material';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private dialog: MdDialog) { }

  ngOnInit() {
  }

  onInfoBoxClick() {
    this.dialog.open(InfoBoxComponent);
  }

}
