import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AlertService } from '../../services/alert.service';
import { InfoBoxComponent } from '../../dialogs/info-box-dialog/info-box.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(private alert: AlertService) {}

  ngOnInit() {}

  onInfoBoxClick() {
    this.alert.showDialog(
      InfoBoxComponent,
      {
        title: 'INFO_BOX_TITLE',
        content: 'INFO_BOX_CONTENT',
      },
      false
    );
  }
}
