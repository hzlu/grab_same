import querystring from 'querystring';
import backupMedia from './backupMedia';
import {
  searchChannel,
  printChannelDetail,
  printSenses,
} from './fetchSame';

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
    return printChannelDetail(this.detailUrl);
  }

  senses() {
    return printSenses(this.nextSenses || this.sensesUrl, this);
  }

  backup() {
    return backupMedia(this.sensesUrl);
  }
};

export default Channel;
