import { Record } from './record';
import { User } from './user';

export interface PartnerApiModel {
  user_firstname: string;
  user_lastname: string;
  user_login: string;
  user_mail: string;
  user_matrikel: string;
}

export class Partner extends Record {
  static fromApiType(record: PartnerApiModel): Partner {
    if (!record) return null;
    return new Partner(
      record.user_firstname,
      record.user_lastname,
      record.user_login,
      record.user_mail,
      record.user_matrikel,
    );
  }

  static fromUser(user: User): Partner {
    return new Partner(
      user.firstName,
      user.lastName,
      user.login,
      user.email,
      user.matrikel,
    )
  }

  toApiType(): PartnerApiModel {
    return {
      user_firstname: this.firstName,
      user_lastname: this.lastName,
      user_login: this.login,
      user_mail: this.email,
      user_matrikel: this.matrikel,
    };
  }

  constructor(public firstName: string,
              public lastName: string,
              public login: string,
              public email: string,
              public matrikel: string) {
    super();
  }
}
