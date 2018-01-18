import { Record } from './record';
import { User } from './user';

export interface AcceptDeclineApiModel {
  user_firstname: string;
  user_lastname: string;
  user_login: string;
  user_mail: string;
  user_matrikel: string,
  accept: boolean;
}

export class AcceptDecline extends Record {
  static fromApiType(record: AcceptDeclineApiModel): AcceptDecline {
    return new AcceptDecline(
      record.user_firstname,
      record.user_lastname,
      record.user_login,
      record.user_mail,
      record.user_matrikel,
      record.accept,
    );
  }

  static fromUser(user: User, accept: boolean): AcceptDecline {
    return new AcceptDecline(
      user.firstName,
      user.lastName,
      user.login,
      user.email,
      user.matrikel,
      accept,
    );
  }

  toApiType(): AcceptDeclineApiModel {
    return {
      user_firstname: this.firstName,
      user_lastname: this.lastName,
      user_login: this.login,
      user_mail: this.email,
      user_matrikel: this.matrikel,
      accept: this.accept,
    };
  }

  constructor(public firstName: string,
              public lastName: string,
              public login: string,
              public email: string,
              public matrikel: string,
              public accept: boolean) {
    super();
  }
}
