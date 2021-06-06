<template>
  <div class="menu">
    <h2>Menu</h2>
    <ul>
        <li class="menu-item">Salas <i class="fas fa-door-open"></i></li>
        <li class="menu-item">Disciplinas <i class="fas fa-book"></i></li>
        <li class="menu-item">Turmas <i class="fas fa-users"></i></li>
        <li class="menu-item">Professores <i class="fas fa-chalkboard-teacher"></i></li>
        <li class="menu-item">Horários <i class="fas fa-calendar-check"></i></li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style>
.menu {
  grid-area: menu;
  background-color: #41687e;
  height: calc(100vh - 80px);
  font-family: "Titillium Web", sans-serif;
  font-weight: 200;
  color: #fff;
}

.menu h2 {
  font-weight: 200;
  font-size: 35px;
  padding: 10px 0;
  border-bottom: 1px solid #769AAE;
}

.menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 30px;
    padding: 5px 30px;
    border-bottom: 1px solid #769AAE;
}
</style>