export default class RegistrationService {
  constructor() {
    this.user = {};
    this.institutes = [];
    this.semester = '';
  }

  setUser(user) {
    this.user = user;
  }

  setInstitutes(institutes) {
    this.institutes = institutes;
  }

  getUser() {
    return this.user;
  }

  getInstitutes() {
    return this.institutes;
  }

  getSemester() {
    return this.semester;
  }

  requestUser(sNumber) {
    return new Promise((resolve, reject) => {
      resolve({
        sNumber: sNumber,
        firstName: 'Lars',
        lastName: 'Gröber',
        matrikel: '32566463',
        eMail: 'dshf@example.com',
      });
    });
  }

  requestInstitutes() {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }
}
