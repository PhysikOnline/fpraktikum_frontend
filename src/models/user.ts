import { Institute, InstituteApiModel } from './institute';
import { Record } from './record';
import { Partner, PartnerApiModel } from './partner';

export interface UserApiModel {
  user_firstname?: string;
  user_lastname?: string;
  user_login?: string;
  user_mail?: string;
  user_matrikel?: string;
  notes?: string;
  institutes?: InstituteApiModel[];
  status?: string;
  partner?: PartnerApiModel;
  graduation?: string;
  partner_has_accepted?: boolean;
  has_accepted?: boolean;
  registrant?: UserApiModel;
}

export class User extends Record {
  static fromApiType(record: UserApiModel): User {
    if (!record) return null;

    const institutes = record.institutes ? record.institutes.map(i => Institute.fromApiType(i)) : null;
    const partner = record.partner ? Partner.fromApiType(record.partner) : null;
    const registrant = record.registrant ? User.fromApiType(record.registrant) : null;

    let graduation = record.graduation ? record.graduation : '';
    if (!graduation && institutes) {
      graduation = institutes.length > 0 ? institutes[0].graduation : '';
    }

    return new User(
      record.status,
      graduation,
      record.user_firstname,
      record.user_lastname,
      record.user_login,
      record.user_mail,
      record.user_matrikel ? record.user_matrikel : 'doesNotExist',
      record.notes,
      institutes,
      partner,
      record.partner_has_accepted,
      record.has_accepted,
      registrant,
    );
  }

  toApiType(): UserApiModel {
    const institutes = this.institutes ? this.institutes.map(i => i.toApiType()) : null;
    return {
      user_firstname: this.firstName,
      user_lastname: this.lastName,
      user_login: this.login,
      user_mail: this.email,
      user_matrikel: this.matrikel,
      graduation: this.graduation,
      notes: `"${this.notes}"`,
      institutes: institutes,
      status: this.status,
      partner: this.partner ? this.partner.toApiType() : null,
      partner_has_accepted: this.hasPartnerAccepted,
    };
  }

  constructor(public status: string,
              public graduation?: string,
              public firstName?: string,
              public lastName?: string,
              public login?: string,
              public email?: string,
              public matrikel?: string,
              public notes?: string,
              public institutes?: Institute[],
              public partner?: Partner,
              public hasPartnerAccepted?: boolean,
              public hasAccepted?: boolean,
              public registrant?: User) {
    super();
  }
}
