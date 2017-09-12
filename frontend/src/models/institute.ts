import { Record } from './record';

export interface InstituteApiModel {
  name: string;
  graduation: string;
  places: number;
  semester_half: number;
}

export class Institute extends Record {
  static fromApiType(record: InstituteApiModel): Institute {
    return new Institute(
      record.name,
      record.graduation,
      record.places,
      record.semester_half);
  }

  toApiType(): InstituteApiModel {
    return {
      name: this.name,
      graduation: this.graduation,
      places: this.places,
      semester_half: this.semesterHalf,
    };
  }

  constructor(public name: string,
              public graduation: string,
              public places: number,
              public semesterHalf: number) {
    super();
  }
}
