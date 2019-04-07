<template>
<div>
  <div class="level">
    <div class="level-left">
      <h2 class="subtitle">镜像&#x2F;反代列表</h2>
    </div>
    <div class="level-right">
      <div class="level-item">
        <label class="checkbox">
          <input type="checkbox" v-model="filterRelease">
          仅发行版安装镜像
        </label>
      </div>
      <div class="level-item">
        <div class="field">
          <p class="control has-icons-left">
            <input v-model="filterInput" class="input" type="text" placeholder="输入名称查找镜像/反代服务">
            <span class="icon is-small is-left">
              <i class="fa fa-search"></i>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
  <repo-list :filter-input="filterInput" :filter-release="filterRelease" />
</div>
</template>

<script>
import RepoList from '@/components/partial/repoList'

export default {
  name: 'repoPanel',
  components: {RepoList},
  data: () => ({
    filterInput: '',
    filterRelease: false
  })
}
</script>
