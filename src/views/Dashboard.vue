<template>
  <div class="dashboard">
      <Menu />
      <router-view/>
  </div>
</template>

<script>
import Menu from '../components/Menu.vue'
export default {
    components: {
        Menu
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