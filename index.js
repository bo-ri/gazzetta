const feedly = require('./libs/feedly');

async function main () {
  const collections = await feedly.getCollections();
  console.log(collections);
}

main();