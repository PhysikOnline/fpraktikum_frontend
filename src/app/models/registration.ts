import { Record } from './record';
import { Institute, InstituteApiModel } from './institute';

interface RegistrationApiModel {
  semester: string;
  start_date: string;
  end_date: string;
  institutes: InstituteApiModel[];
}

export class Registration extends Record {
  static fromApiType(record: RegistrationApiModel): Registration {
    if (!record) {
      return null;
    }
    return new Registration(
      record.semester,
      new Date(record.start_date),
      new Date(record.end_date),
      record.institutes
        ? record.institutes.map(i => Institute.fromApiType(i))
        : []
    );
  }

  toApiType(): RegistrationApiModel {
    return {
      semester: this.semester,
      start_date: this.startDate.toISOString(),
      end_date: this.endDate.toISOString(),
      institutes: this.institutes.map(i => i.toApiType()),
    };
  }

  constructor(
    public semester: string,
    public startDate: Date,
    public endDate: Date,
    public institutes: Institute[]
  ) {
    super();
  }
}
