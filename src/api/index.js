import axios from 'axios'
import Parser from 'rss-parser'
import _ from 'lodash'

// The type of the return value of getFeeds()
// for documenting purpose only
// eslint-disable-next-line
function getFeedsResult () {
  this.title = 'title of feed'
  this.pubDate = new Date()
  this.url = 'https://test.com'
}

/**
 * @param {string} url
 * @fulfill {getFeedsResult[]}
 * @reject {Error}
 * @return {Promise.<getFeedsResult[]>}
 */
async function getFeeds (url) {
  const parser = new Parser()
  return parser.parseURL(url)
    .then(({items}) => _.map(items, rssItem => ({
      title: rssItem.title,
      url: rssItem.link,
      pubDate: new Date(rssItem.pubDate)
    })))
}

/**
 *
 * @param {string} url
 * @return {Promise.<Object.<string, string>>} an object: name => desciption HTML
 */
async function getHelps (url) {
  const parser = new Parser()
  return parser.parseURL(url)
    .then(({items}) => _.fromPairs(_.map(items, item => [item.title, item.content])))
}

// eslint-disable-next-line
function getBackendSummarySingleResult () {
  this.name = 'name of this repo'
  this.idle = false
  this.result = true
  this.lastFinished = new Date()
}

/**
 * @param {string} url
 * @return {Promise.<getBackendSummarySingleResult[]>}
 */
async function getBackendSummary (url) {
  return axios.get(url)
    .then(({data}) => _.map(data.WorkerStatus, (val, key) => ({
      name: key,
      idle: val.Idle,
      result: val.Result,
      lastFinished: new Date(val.LastFinished)
    })))
    .then(data => _.sortBy(data, 'name'))
}

export {
  getFeeds,
  getBackendSummary,
  getHelps
}
