<template>
   <table class="table is-fullwidth">
     <thead>
       <tr>
         <th>镜像名</th>
         <th>状态</th>
         <th>最近更新</th>
         <th>帮助</th>
       </tr>
     </thead>
     <tbody>
       <tr v-for="item in backendSummary" v-if="isMatched(item.name)" :key="item.name" class="help-row">
         <th><a :href="item.name | toAddress">{{item.name}}</a></th>
         <td>
           <span v-if="item.idle && item.result" class="tag is-success">同步成功</span>
           <span v-else-if="item.idle && !item.result" class="tag is-danger">同步失败</span>
           <span v-else-if="!item.idle" class="tag">同步中</span>
        </td>
         <td>
           <time :datetime="item.lastFinished">{{item.lastFinished.toLocaleString()}}</time>
          </td>
          <td>
            <template v-if="loadingHelp">
              <span class="icon is-small">
                  <i class="fa fa-spinner"></i>
              </span>
            </template>
            <template v-else-if="item.name in helps">
              <a href="javascript:void(0)" @click="switchHelp(item.name)">
              查看帮助
              <span class="icon is-small">
                    <i class="fa" :class="expandedName === item.name ? 'fa-chevron-up': 'fa-chevron-down'"></i>
              </span>
              </a>
              <transition name="slidedown">
                <div class="box help-content" v-if="expandedName === item.name">
                  <div class="contents content" v-html="helps[item.name]">
                  </div>
                </div>
              </transition>
            </template>
          </td>
       </tr>

     </tbody>
   </table>
</template>

<script>
import {getBackendSummary, getHelps} from '@/api'
import config from '@/config'
import releaseList from './releaseList.json'
import _ from 'lodash'

export default {
  name: 'repoList',
  data () {
    return {
      expandedName: null,
      backendSummary: [],
      loadingHelp: true,
      helps: {}
    }
  },
  props: {
    filterInput: String,
    filterRelease: Boolean
  },
  mounted () {
    getBackendSummary(config.backendSummaryAddress).then((summary) => {
      this.backendSummary = summary
    })
    .catch(e => {
      console.error(e)
    })
    getHelps(config.helpAddress).then(helpMap => {
      this.helps = helpMap
      this.loadingHelp = false
    })
  },
  watch: {
    backendSummary: {
      deep: true,
      handler: function (val, old) {
        console.log('from ', old, ' to ', val)
      }
    }
  },
  methods: {
    switchHelp (name) {
      if (this.expandedName !== name) {
        this.expandedName = name
      } else {
        this.expandedName = null
      }
    },
    /**
     * @param name {string}
     */
    isMatched (name) {
      if (this.filterRelease) return _.includes(releaseList.data, name)
      return name.includes(this.filterInput)
    }
  },
  filters: {
    toAddress (name) {
      return config.backendAddressBase + '/' + name + '/'
    }
  }
}
</script>

<style lang="scss">
.help-row {
  position: relative;
  .help-content {
    position: absolute;
    width: 100%;
    left: 0;
    z-index: 100;
    overflow: hidden;
  }
}

.slidedown-enter-active, .slidedown-leave-active {
  transition-property: max-height, padding-top, padding-bottom;
  transition-duration:  0.5s;
}
.slidedown-enter, .slidedown-leave-to {
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.slidedown-enter-to, .slidedown-leave {
  max-height: 100vh;
}

pre {
  white-space: pre-line;
}
</style>
