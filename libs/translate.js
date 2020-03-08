const axios = require('axios');
const URL = 'https://script.google.com/macros/s/AKfycbyb4vCtsw7L58sV84evRM7Kh6gNLZaxPfRSwq8JjJoE35dTMWY/exec';

const header = {
  'Content-Type': 'application/json'
};

exports.translate = async function (term) {
  const data = await axios.get(URL, {
    headers: header,
    params: {
      text: term,
      source: 'it',
      target: 'ja'
    }
  })
    .catch((err) => {
      return err;
    });
  return data.data;
}