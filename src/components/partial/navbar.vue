<template>
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <router-link class="navbar-item " to="/" active-class="is-active">
      <span class="sjtug-name">SJTUG</span> 软件源镜像服务
    </router-link>
  </div>
  <div class="navbar-menu">
    <div class="navbar-end">
      <router-link class="navbar-item" active-class="is-active" to="/admin">
        <span class="icon">
          <i class="fa fa-cogs"></i>
        </span>
        监控
      </router-link>
      <a class="navbar-item" href="http://sjtug.org">
        SJTUG 主页
      </a>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style lang="scss" scoped>
.sjtug-name {
  font-family: 'Ceviche One', cursive;
  font-size: 1.35rem;
  align-self: auto;
  padding-right: 0.25rem;
}
</style>
