import { Institute, InstituteApiModel } from './institute';
import { Record } from './record';
import { Partner, PartnerApiModel } from './partner';

export interface UserApiModel {
  user_firstname?: string;
  user_lastname?: string;
  user_login?: string;
  user_email?: string;
  institutes?: InstituteApiModel[];
  status: string;
  partner?: PartnerApiModel;
}

export class User extends Record {
  static fromApiType(record: UserApiModel): User {
    return new User(
      record.status,
      '',
      record.user_firstname,
      record.user_lastname,
      record.user_login,
      record.user_email,
      record.institutes.map(i => Institute.fromApiType(i)),
      Partner.fromApiType(record.partner),
    );
  }

  toApiType(): UserApiModel {
    return {
      user_firstname: this.firstName,
      user_lastname: this.lastName,
      user_login: this.login,
      user_email: this.email,
      institutes: this.institutes.map(i => i.toApiType()),
      status: this.status,
      partner: this.partner.toApiType(),
    };
  }

  constructor(public status: string,
              public graduation?: string,
              public firstName?: string,
              public lastName?: string,
              public login?: string,
              public email?: string,
              public institutes?: Institute[],
              public partner?: Partner) {
    super();
  }
}
