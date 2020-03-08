const feedly = require('./libs/feedly');
const slack = require('./libs/slack');

async function main () {
  const collections = await feedly.getCollections();
  // console.log(collections);
  const calcio = collections[0];
  // console.log(calcio);
  const feeds = await feedly.getFeedStream(calcio.feeds[0].feedId);
  // console.log(summaryData);
  const article = await feedly.getEntry(feeds.ids[0]);
  // console.log(article);
  // const summary = article[0].summary.content;
  // const image_url = article[0].visual.url;
  // const title = article
  const response = await slack.sendMessage(article[0]);
}

main();