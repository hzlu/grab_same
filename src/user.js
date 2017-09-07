import { fetchUserProfile, fetchSenses } from './fetchSame';

const User = class {
  constructor(userId) {
    this.userId = userId;
    this.profileUrl = `/user/${userId}/profile`;
    this.sensesUrl = `/user/${userId}/senses`;
    this.nextSenses = '';
  }

  profile() {
    fetchUserProfile(this.profileUrl);
  }

  senses() {
    fetchSenses(this.sensesUrl);
  }
};

export default User;
