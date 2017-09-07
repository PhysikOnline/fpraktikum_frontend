import { Record } from './record';
import { Institute } from './institute';

interface RegistrationApiModel {
  semester: string;
  start_date: string;
  end_date: string;
  institutes: Institute[];
}

export class Registration extends Record {
  static fromApiType(record: RegistrationApiModel): Registration {
    return new Registration(
      record.semester,
      new Date(record.start_date),
      new Date(record.end_date),
      record.institutes,
    );
  }

  toApiType(): RegistrationApiModel {
    return {
      semester: this.semester,
      start_date: this.startDate.toISOString(),
      end_date: this.endDate.toISOString(),
      institutes: this.institutes
    };
  }

  constructor(public semester: string,
              public startDate: Date,
              public endDate: Date,
              public institutes: Institute[]) {
    super();
  }
}
