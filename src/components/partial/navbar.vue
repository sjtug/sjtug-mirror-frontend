<template>
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item " href="https://mirrors.sjtug.org">
      <span class="sjtug-name">SJTUG</span> 软件源镜像服务
    </a>
  </div>
  <div class="navbar-menu">
    <div class="navbar-end">
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
