<template>
  <div>
    <ul v-if="!loading">
      <li v-for="item in news" :key="item.title">
        <a :href="item.url">{{item.title}}  <time class="has-text-grey-light" :datetime="item.pubDate">{{item.pubDate.toLocaleDateString()}}</time></a>
      </li>

    </ul>
    <span v-else class="icon has-text-centered">
      <i class="fa fa-spinner fa-pulse"></i>
    </span>
  </div>
</template>

<script>
import config from '@/config'
import {getFeeds} from '@/api'
import _ from 'lodash'

export default {
  name: 'news',
  data: () => ({
    news: [],
    loading: false
  }),
  mounted () {
    this.loading = true
    getFeeds(config.feedAddress)
      .then(feedResult => {
        this.news = _
          .chain(feedResult)
          .sortBy(item => -item.pubDate)
          .take(5)
          .value()
        this.loading = false
      })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>
