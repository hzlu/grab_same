import querystring from 'querystring';
import { searchChannel, fetchChannelDetail, fetchSenses } from './fetchSame';

const Channel = class {
  static search(name) {
    const searchUrl = `/channel/search?query=${querystring.escape(name)}`;
    return searchChannel(searchUrl);
  }

  constructor(channelId) {
    this.channelId = channelId;
    this.detailUrl = `/channel/${channelId}/detail`;
    this.sensesUrl = `/channel/${channelId}/senses`;
    this.nextSenses = '';
  }

  setNext(next) {
    this.nextSenses = next;
  }

  detail() {
    return fetchChannelDetail(this.detailUrl);
  }

  senses() {
    return fetchSenses(this.nextSenses || this.sensesUrl, this);
  }
};

export default Channel;
