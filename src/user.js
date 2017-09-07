import backupMedia from './backupMedia';
import {
  printUserProfile,
  printSenses,
} from './fetchSame';

const User = class {
  constructor(userId) {
    this.userId = userId;
    this.profileUrl = `/user/${userId}/profile`;
    this.sensesUrl = `/user/${userId}/senses`;
    this.nextSenses = '';
  }

  setNext(next) {
    this.nextSenses = next;
  }

  detail() {
    return printUserProfile(this.profileUrl);
  }

  senses() {
    return printSenses(this.nextSenses || this.sensesUrl, this);
  }

  backup() {
    return backupMedia(this.sensesUrl);
  }
};

export default User;
