<template>
  <header class="sticky-top">
    <Navbar />
  </header>
  <main class="container-fluid">
    <section class="row">
      <div class="col-9">

        <router-view />
      </div>
      <div class="col-3 bg-success">
        <AdsPost />
      </div>
    </section>
  </main>
  <footer class="bg-dark text-light">
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import AdsPost from './components/AdsPost.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, AdsPost }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
