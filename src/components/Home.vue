<template>
  <div class="home">
    <i class="fas fa-calendar-alt main-icon"></i>
    <h2 class="welcome-text">Bem vindo(a) ao Cronos!</h2>
  </div>
</template>

<script>
export default {};
</script>

<style>
.home {
  grid-area: home;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.main-icon {
    font-size: 180px;
    color: #aaa;
    margin-bottom: 10px;
}
.welcome-text {
    color: #aaa;
    font-family: 'Titillium Web', sans-serif;
    font-weight: 200;
}

</style>