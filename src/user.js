import { fetchUserProfile, fetchSenses } from './fetchSame';

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
    return fetchUserProfile(this.profileUrl);
  }

  senses() {
    return fetchSenses(this.nextSenses || this.sensesUrl, this);
  }
};

export default User;
