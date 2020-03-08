const axios = require('axios');
const mrkdwn = require('html-to-mrkdwn');

const translate = require('./translate').translate;

const url = require('../credentials.json').slack_channel_url;

// post summary message
exports.sendMessage = async function (article) {
  // feedsに含まれるデータ
  const originText = article.summary.content;
  const title = article.title;
  const link = article.originId;
  const media = article.origin.htmlUrl;
  // summaryがhtml形式で帰ってくるのでレンダリングしておく
  const txtBase = '<details><summary>ヒント</summary><div>単語A: 意味<div></details>';;
  const text = mrkdwn(originText).text;

  // ヒントに使う単語を翻訳しておく
  const words = await analyzeItaly(text);
  // static selectionのoptionsを作る
  const options = generateOptions(words);
  console.log(options);
  const data = await axios.post(url, {
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "plain_text",
          "text": ":soccer: " + media + " :soccer:"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*" + title + "*"
        }
      },
      {
        "type": "context",
        "elements": [
          {
            "type": "mrkdwn",
            "text": link
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": text
        }
      },
      {
        "type": "divider"
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*ヒント* => => =>"
        },
        "accessory": {
          "type": "static_select",
          "action_id": "select",
          "placeholder": {
            "type": "plain_text",
            "text": "ヒント"
          },
          "options": options
          // [
          //   {
          //     "text": {
          //       "type": "plain_text",
          //       "text": "- 単語A: 意味"
          //     },
          //     "value": "a"
          //   },
          //   {
          //     "text": {
          //       "type": "plain_text",
          //       "text": "- 単語B: 意味"
          //     },
          //     "value": "b"
          //   }
          // ]
        }
      }
    ]
  });
  return data;
}

async function analyzeItaly (sentence) {
  const terms = sentence.split(/\n|\s/);
  let words = [];
  for(let i = 0; i < terms.length; i++) {
    if (terms[i]) {
      const term = await translate(terms[i]);
      words.push([terms[i], term]);
    }
  }
  return words;
}

function generateOptions (words) {
  let options = [];
  for (let i = 0; i < words.length; i++) {
    console.log(words[i]);
    const data = {
      "text": {
        "type": "plain_text",
        "text": "- " + words[i][0] + ":  " + words[i][1]
      },
      "value": String(i)
    }
    options.push(data);
  }
  return options;
}