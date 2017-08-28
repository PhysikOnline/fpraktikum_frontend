import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFormComponent } from './registration-form.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../modules/material.module';
import { StepComponent } from '../step/step.component';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { InstituteFilterPipe } from '../../pipes/institute-filter.pipe';
import { RegistrationService } from '../../services/registration.service';
import { TranslateService } from '../../services/translate.service';

class RegistrationServiceMock {

}

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegistrationFormComponent,
        StepComponent,
        TranslatePipe,
        InstituteFilterPipe
      ],
      imports: [
        FormsModule,
        MaterialModule
      ],
      providers: [
        { provide: RegistrationService, useClass: RegistrationServiceMock },
        TranslateService
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(RegistrationFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should be created', () => {
    expect(true).toBeTruthy();
  });
});
