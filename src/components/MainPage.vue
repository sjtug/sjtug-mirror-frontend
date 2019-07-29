<template>
  <div class="portal">
    <div class="hero is-info">
      <div class="hero-body mw-banner">
        <div class="container has-text-left">
          <h1 class="title">稳定、快速、现代的镜像服务</h1>
          <h2 class="subtitle">
            托管于华东教育网骨干节点——上海交通大学
          </h2>
        </div>
      </div>
    </div>
    <section>
      <div class="container">
        <div class="mw-body">
          <div class="columns">
            <div class="column is-9">
              <div class="tabs">
                <ul>
                  <li :class="{ 'is-active': page == 'repo' }"><a href="javascript:" @click="page = 'repo'">镜像/反代列表</a></li>
                  <li :class="{ 'is-active': page == 'release' }"><a href="javascript:" @click="page = 'release'">发行版列表</a></li>
                </ul>
              </div>
              <repo-panel v-if="page == 'repo'" />
              <release-panel v-if="page == 'release'" />
            </div>
            <div class="column">
              <h2 class="subtitle">镜像源新闻</h2>
              <div class="notification">
                欢迎关注我们的Telegram频道 <a href="https://t.me/sjtug_mirrors_news">@sjtug_mirrors_news</a> 获取最新资讯
              </div>
              <news />
            </div>
          </div>

        </div>
      </div>
    </section>

  </div>
</template>

<script>
import News from '@/components/partial/news'
import RepoPanel from '@/components/partial/repoPanel'
import ReleasePanel from '@/components/partial/releasePanel'
export default {
  name: 'MainPage',
  components: {
    News,
    RepoPanel,
    ReleasePanel
  },
  data: () => ({
    page: 'repo'
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mw-banner {
  padding: 5rem 1.5rem;
}

.mw-body {
  margin: 2em 0;
}

.portal {
  min-height: 75vh;
}
</style>
