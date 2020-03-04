const axios = require('axios');
const token = require('./feedly.json').access_token;

const URL = "https://cloud.feedly.com";

const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + token
}

async function getArticles () {
  return await axios.get(URL + '/v3/collections', {
    headers: headers
  });
}

async function getFeed (id) {
  return await axios.get(URL + '/v3/feeds/' + id, {
    headers: headers
  })
    .catch((err) => {
      return err;
    })
}

async function searchFeed (query) {
  return await axios.get(URL + '/v3/search/feeds', {
    headers: headers,
    params: {
      query: query
    }
  })
}

async function getFeedStream (id) {
  return await axios.get(URL + '/v3/streams/' + id + '/ids', {
    headers: headers
  })
    .catch((err) => {
      return err;
    });
}

async function getEntry (entryId) {
  return await axios.get(URL + '/v3/entries/' + entryId, {
    headers: headers
  })
    .catch((err) => {
      return err;
    });
}

async function main () {
  // get all feeds
  const data = await getArticles();

  // get specific feed info
  const feedId = encodeURIComponent(data.data[0].feeds[0].feedId);
  const feeds = await getFeed(feedId);
  // console.log(feeds.data);

  // get feed from stream
  const feedStream = await getFeedStream(feedId); 
  // console.log(feedStream);

  // get entries by using previous ids
  const entry = await getEntry(encodeURIComponent(feedStream.data.ids[0]));
  console.log(entry.data);
  // for (let i = 0; i < feedStream.data.ids.length; i++) {
  //   const entry = await getEntry(encodeURIComponent(feedStream.data.ids[i]));
  //   console.log('=========== { ' + i + ' } ===========')
  //   console.log(entry.data);
  // }
}

main();