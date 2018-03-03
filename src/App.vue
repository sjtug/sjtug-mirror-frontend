<template>
  <div id="app">
    <navbar></navbar>
    <router-view/>
    <mirror-footer></mirror-footer>
  </div>
</template>

<script>
import Navbar from '@/components/partial/navbar.vue'
import Footer from '@/components/partial/footer.vue'

export default {
  name: 'app',
  components: {
    Navbar,
    // Cannot simply use footer because it is a standard tag
    mirrorFooter: Footer
  }
}
</script>

<style>
</style>
