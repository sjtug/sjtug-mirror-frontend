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
              <repo-panel />
            </div>
            <div class="column">
              <h2 class="subtitle">镜像源新闻</h2>
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

export default {
  name: 'MainPage',
  components: {
    News,
    RepoPanel
  }
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
