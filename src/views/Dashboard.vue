<template>
  <div class="dashboard">
      <Menu/>
      <home/>
  </div>
</template>

<script>
import Home from '../components/Home.vue'
import Menu from '../components/Menu.vue'
export default {
    components: {
        Menu,
        Home
    }
}
</script>

<style>
.dashboard {
    display: grid;
    grid-template-columns: 300px 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: 'menu home';

}

</style>