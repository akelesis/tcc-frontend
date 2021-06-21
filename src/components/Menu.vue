<template>
  <div class="menu">
    <div class="upside-block">
        <h2>Menu</h2>
        <ul>
            <li class="menu-item" @click="redirectRooms">Salas <i class="fas fa-door-open"></i></li>
            <li class="menu-item">Disciplinas <i class="fas fa-book"></i></li>
            <li class="menu-item">Turmas <i class="fas fa-users"></i></li>
            <li class="menu-item">Professores <i class="fas fa-chalkboard-teacher"></i></li>
            <li class="menu-item">Horários <i class="fas fa-calendar-check"></i></li>
        </ul>
    </div>
    <div class="user-card">
        
        <p>Olá {{nome}}</p>
        <img src="../assets/mocked-profile.png" alt="foto de perfil">
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            nome: "Hélder"
        }
    },
    methods: { 
        redirectRooms() {
            this.$router.push('/dashboard/rooms')
        }
    }
};
</script>

<style>
.menu {
  grid-area: menu;
  background-color: #41687e;
  height: calc(100vh - 80px);
  font-family: "Titillium Web", sans-serif;
  font-weight: 200;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
    background-color: #41687e;
    border-bottom: 1px solid #769AAE;
    cursor: pointer;
}

.menu-item:hover {
    filter: brightness(110%);
}

.user-card {
    background-color: #41687e;
    width: 200px;
    height: 60px;
    border: 1px solid #fff;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    align-self: center;
    margin-bottom: 50px;
    cursor: pointer;
}

.user-card:hover {
    filter: brightness(110%);
}

.user-card img {
    width: 50px;
    border-radius: 50%;
    border: 1px solid white;
}
</style>