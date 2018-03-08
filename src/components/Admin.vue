<template>
  <div class="admin container">
    <h1 class="title">镜像源监控</h1>
    <iframe src="https://app.logz.io/#/dashboard/kibana?embed=true&kibanaRoute=%2Fdashboard%2F0b776340-211a-11e8-8e94-d9bd750d361a%3F_g%3D(refreshInterval%253A(display%253AOff%252Cpause%253A!f%252Cvalue%253A0)%252Ctime%253A(from%253Anow%252Fd%252Cmode%253Aquick%252Cto%253Anow%252Fd))&theme=default&shareToken=c66b1e8e-2296-423e-bbce-0a41226baa70" class="monitor-frame" ref="monitorFrame" @load="resizeIframe" />

  </div>
</template>

<script>
function resizeIFrameToFitContent (iFrame) {
  iFrame.width = iFrame.contentWindow.document.body.scrollWidth
  iFrame.height = iFrame.contentWindow.document.body.scrollHeight
}

export default {
  name: 'Admin',
  methods: {
    resizeIframe () {
      resizeIFrameToFitContent(this.$refs.monitorFrame)
    }
  }
}
</script>

<style scoped>
.monitor-frame {
  width: 100%;
  height: auto;
  border: none;
  min-height: 80vh;
}
</style>
