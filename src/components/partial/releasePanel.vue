<template>
<div>
    <table class="table is-fullwidth">
     <thead>
       <tr>
         <th>镜像名</th>
         <th>发行版</th>
       </tr>
     </thead>
     <tbody>
       <tr v-for="item in releaseList" :key="item.id" class="help-row">
         <th><a :href="item.id | toAddress">{{item.id}}</a></th>
         <td><a v-for="release in item.releases" :key="release.id" :href="release.url | toAddress" class="button is-small is-text">{{ release.id }}</a></td>
       </tr>
     </tbody>
   </table>
</div>
</template>

<script>
import _ from 'lodash'
import config from '@/config'
import releaseList from './releaseList.json'

export default {
  name: 'releasePanel',
  data: () => ({
    releaseList: _.map(
      releaseList.release,
        (v, id) => ({
          id,
          releases: _.map(v, (url, id) => ({id, url}))
        }))
  }),
  filters: {
    toAddress (name) {
      return `${config.backendAddressBase}/${name}/`
    }
  }
}
</script>
