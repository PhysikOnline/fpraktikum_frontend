import { Institute } from './institute';
import { Record } from './record';

export interface UserApiModel {
  firstName?: string;
  lastName?: string;
  sNumber?: string;
  graduation?: string;
  email?: string;
  institutes?: Institute[];
  status: string;
  partner?: {
    firstName: string,
    lastName: string,
    sNumber: string,
    email: string,
    institutes: Institute[],
  };
}

export class User extends Record {
  fromApiType(record: UserApiModel): void {
    this.firstName = record.firstName;
    this.lastName = record.lastName;
    this.sNumber = record.sNumber;
    this.graduation = record.graduation;
    this.email = record.email;
    this.institutes = record.institutes;
    this.status = record.status;
    this.partner = record.partner;
  }

  toApiType(): UserApiModel {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      sNumber: this.sNumber,
      graduation: this.graduation,
      email: this.email,
      institutes: this.institutes,
      status: this.status,
      partner: this.partner,
    };
  }

  constructor(public status: string,
              public firstName?: string,
              public lastName?: string,
              public sNumber?: string,
              public graduation?: string,
              public email?: string,
              public institutes?: Institute[],
              public partner?: {
                firstName: string,
                lastName: string,
                sNumber: string,
                email: string,
                institutes: Institute[],
              }) {
    super();
  }
}
