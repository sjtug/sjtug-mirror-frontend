<template>
<div>
  <div class="field">
    <p class="control has-icons-left">
      <input v-model="filterInput" class="input" type="text" placeholder="输入名称查找镜像/反代服务">
      <span class="icon is-small is-left">
        <i class="fa fa-search"></i>
      </span>
    </p>
  </div>
  <repo-list :filter-input="filterInput" />
</div>
</template>
<script>
import RepoList from '@/components/partial/repoList'

export default {
  name: 'repoPanel',
  components: {RepoList},
  data: () => ({
    filterInput: ''
  })
}
</script>
