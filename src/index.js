import axios from 'axios';

const baseURL = 'https://v2.same.com';
const url = '/channel/1015144/senses';

axios({
  url,
  method: 'get',
  baseURL,
  headers: {
    'X-Same-Request-ID': 'b25a97d-2e44-49a3-b420-27fff52ae660',
    'X-same-Client-Version': '593',
    'X-same-Device-UUID': 'd:3527982323924',
    'PACKAGE-NAME': 'com.same.android',
    'User-Agent': 'same/593',
    'Advertising-UUID': 'd:3527982323924',
  },
}).then((response) => {
  console.log(response.status);
  console.log(response.data.data);
});

/* eslint-disable no-console */
console.log(`${url}`);
