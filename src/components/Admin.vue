<template>
  <div class="admin container">
    <h1 class="title">镜像源监控</h1>
    <iframe src="https://app.logz.io/goto/702fb6f271cc53dc06543199abc463d2?shareToken=c66b1e8e-2296-423e-bbce-0a41226baa70" class="monitor-frame" ref="monitorFrame" @load="resizeIframe" />

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
