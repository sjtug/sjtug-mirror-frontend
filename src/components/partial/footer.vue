<template>
<footer class="footer">
  <div class="container">
    <div class="columns">
      <div class="column is-9">
        软件源服务由
        <ul>
          <li>
            <a href="http://sjtug.org">
              <img src="@/assets/logo.png" class="footer-logo">上海交通大学Linux用户组 (SJTUG)
            </a>
            维护
          </li>
          <li>
            <a href="http://net.sjtu.edu.cn">上海交通大学网络信息中心</a>
            赞助资源
          </li>
		      <li>
		        沪交ICP备20180085
		      </li>
        </ul>
      </div>
      <div class="column">
        <aside class="menu">
          <ul class="menu-list">
            <li>
              <a href="https://github.com/sjtug/mirror-requests/issues/new" target="_blank" rel="nofollow">
                <span class="icon">
                  <i class="fa fa-commenting-o"></i>
                </span>
                反馈Bug/提交新镜像请求
              </a>
            </li>
            <li>
              <a href="mailto:vicluo96+mirrors@gmail.com">
                <span class="icon">
                  <i class="fa fa-envelope-o"></i>
                </span>
              给我们发送邮件
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  </div>
</footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>
.footer-logo {
  width: 1.5rem;
  vertical-align: text-bottom;
}
</style>
