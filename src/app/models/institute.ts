import { Record } from './record';

export interface InstituteApiModel {
  id: number;
  name: string;
  graduation: string;
  places: number;
  semesterhalf: number;
  notes?: string;
}

export class Institute extends Record {
  static fromApiType(record: InstituteApiModel): Institute {
    return new Institute(
      record.id,
      record.name,
      record.graduation,
      record.places,
      record.semesterhalf,
      record.notes
    );
  }

  toApiType(): InstituteApiModel {
    return {
      id: this.id,
      name: this.name,
      graduation: this.graduation,
      places: this.places,
      semesterhalf: this.semesterHalf,
      notes: this.notes,
    };
  }

  constructor(
    public id: number,
    public name: string,
    public graduation: string,
    public places: number,
    public semesterHalf: number,
    public notes?: string
  ) {
    super();
  }
}
