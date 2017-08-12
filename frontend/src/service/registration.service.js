const DEFAULT_USER = {
  sNumber: 's123456',
  firstName: 'Lars',
  lastName: 'Gröber',
  matrikel: '32566463',
  eMail: 'dshf@example.com',
};

const DEFAULT_REGISTRATION = {
  semester: 'WS17',
  institutes: [
    {
      id: 0,
      name: 'ITP',
      places: 20,
      graduation: 'BA',
      semester_half: 2,
    },
    {
      id: 1,
      name: 'ITP',
      places: 20,
      graduation: 'BA',
      semester_half: 1,
    },
    {
      id: 2,
      name: 'IAP',
      places: 20,
      graduation: 'BA',
      semester_half: 2,
    },
    {
      id: 3,
      name: 'IAP',
      places: 20,
      graduation: 'BA',
      semester_half: 1,
    },
    {
      id: 4,
      name: 'IKF',
      places: 20,
      graduation: 'MA',
      semester_half: 1,
    },
    {
      id: 5,
      name: 'IKF',
      places: 20,
      graduation: 'MA',
      semester_half: 2,
    },
  ],
};


export default class RegistrationService {
  constructor() {
    this._user = {};
    this._institutes = [];
    this._semester = '';
  }

  get user() {
    return this._user;
  }

  set user(value) {
    this._user = value;
  }

  get institutes() {
    return this._institutes;
  }

  set institutes(value) {
    this._institutes = value;
  }

  get semester() {
    return this._semester;
  }

  set semester(value) {
    this._semester = value;
  }

  /* eslint-disable no-unused-vars */

  sendRegistration(data) {
    return this;
  }

  // TODO replace with real http call
  static requestUser(accountNumber) {
    return new Promise((resolve, reject) => {
      resolve({});
    });
  }

  requestRegistration() {
    return new Promise((resolve, reject) => {
      this._institutes = DEFAULT_REGISTRATION.institutes;
      this.semester = DEFAULT_REGISTRATION.semester;
      resolve(DEFAULT_REGISTRATION);
    });
  }

  getUserInfoFromDoc() {
    // check if we are in ilias environment, otherwise use placeholder vars

    /* eslint-disable no-undef */
    // if (FPCONFIG && FPCONFIG.user) {
    //   return FPCONFIG.user;
    // }
    this.user = DEFAULT_USER;
    return DEFAULT_USER;
  }
}
