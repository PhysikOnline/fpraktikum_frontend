import { Record } from './record';
import { User } from './user';

export interface AcceptDeclineApiModel {
  user_firstname: string;
  user_lastname: string;
  user_login: string;
  user_email: string;
  accept_decline: boolean;
}

export class AcceptDecline extends Record {
  static fromApiType(record: AcceptDeclineApiModel): AcceptDecline {
    return new AcceptDecline(
      record.user_firstname,
      record.user_lastname,
      record.user_login,
      record.user_email,
      record.accept_decline,
    );
  }

  static fromUser(user: User, accept: boolean): AcceptDecline {
    return new AcceptDecline(
      user.firstName,
      user.lastName,
      user.login,
      user.email,
      accept,
    );
  }

  toApiType(): AcceptDeclineApiModel {
    return {
      user_firstname: this.firstName,
      user_lastname: this.lastName,
      user_login: this.login,
      user_email: this.email,
      accept_decline: this.accept,
    };
  }

  constructor(public firstName: string,
              public lastName: string,
              public login: string,
              public email: string,
              public accept: boolean) {
    super();
  }
}
