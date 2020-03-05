const axios = require('axios');
const token = require('../credentials.json').feedly_access_token;

const URL = 'https://cloud.feedly.com';

const header = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + token
}

async function requestBase (endpoint) {
  const data = await axios.get(URL + endpoint, {
    headers: header
  })
    .catch((err) => {
      return err;
    });
  return data.data;
}

// collectionの一覧を取って来る
// ここで取ってきた各collectionのfeedIdをキーにしてstreamからsummaryを取ってくる
exports.getCollections = async function () {
  const endpoint = '/v3/collections';
  return await requestBase(endpoint)
    .catch((err) => {
      return err;
    });
}

// Feedの一覧を取ってくる
// 使わないかも
exports.getFeeds = async function (feedId) {
  const endpoint = '/v3/feeds/' + encodeURIComponent(feedId);
  return await requestBase(endpoint)
    .catch((err) => {
      return err;
    });
}

// 記事のsummaryを取ってくる
exports.getFeedStream = async function (feedId) {
  const endpoint = '/v3/streams/' + encodeURIComponent(feedId) + '/ids';
  return await requestBase(endpoint)
    .catch((err) => {
      return err;
    });
}
