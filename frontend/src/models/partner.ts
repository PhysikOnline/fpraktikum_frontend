import { Record } from './record';

export interface PartnerApiModel {
  user_firstname: string;
  user_lastname: string;
  user_login: string;
  user_email: string;
}

export class Partner extends Record {
  static fromApiType(record: PartnerApiModel): Partner {
    if (!record) return null;
    return new Partner(
      record.user_firstname,
      record.user_lastname,
      record.user_login,
      record.user_email,
    );
  }

  toApiType(): PartnerApiModel {
    return {
      user_firstname: this.firstName,
      user_lastname: this.lastName,
      user_login: this.login,
      user_email: this.email,
    };
  }

  constructor(public firstName: string,
              public lastName: string,
              public login: string,
              public email: string) {
    super();
  }
}
