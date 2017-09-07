import { Record } from './record';

interface InstituteApiModel {
  name: string;
  graduation: string;
  places: number;
  semester_half: number;
}

export class Institute extends Record {
  fromApiType(record: InstituteApiModel): void {
    this.name = record.name;
    this.graduation = record.graduation;
    this.places = record.places;
    this.semesterHalf = record.semester_half;
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
