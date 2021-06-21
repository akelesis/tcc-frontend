<template>
  <div class="rooms">
    <div class="rooms-title-box">
      <h1><i class="fas fa-door-open"></i>Salas</h1>
    </div>
    <div class="rooms-list-box">
      <div class="rooms-list-container">
        <table width="100%">
          <thead>
            <th width="20%">Código</th>
            <th width="20%">Nome</th>
            <th width="20%">Capacidade</th>
            <th width="20%">Estações</th>
            <th width="20%">Ações</th>
          </thead>
          <tbody>
            <tr
              :class="rooms.indexOf(room) % 2 == 0 ? even : ''"
              v-for="room in rooms"
              :key="room.id"
            >
              <td>{{ room.id }}</td>
              <td>{{ room.name }}</td>
              <td>{{ room.capacity }}</td>
              <td>{{ room.stations }}</td>
              <td class="room-actions">
                <button class="edit-btn"><i class="fas fa-pencil-alt"></i></button>
                <button class="delete-btn"><i class="fas fa-trash-alt"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="room-register-box">
      <div class="room-register-container">
        <div class="room-register-header">
          <h3>Cadastro / Edição</h3>
        </div>
        <div class="room-register-body">
          <div>
            <input class="register-inputs" type="text" placeholder="Nome" />
            <input class="register-inputs" type="text" placeholder="Capacidade" />
            <input class="register-inputs" type="text" placeholder="Estações" />
            <button class="register-btn">Salvar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rooms: [
        {
          id: 1,
          name: "17B",
          capacity: 30,
          stations: 20,
        },
        {
          id: 2,
          name: "18B",
          capacity: 30,
          stations: 20,
        },
        {
          id: 3,
          name: "16B",
          capacity: 25,
          stations: 16,
        },
      ],
      even: "even",
    };
  },
};
</script>

<style>
.rooms {
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rooms-title-box {
  display: flex;
  justify-content: flex-start;
  width: 75%;
}

.rooms-title-box h1 {
  text-align: start;
  font-family: "Titillium Web", sans-serif;
  font-weight: 400;
  color: #41687e;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  font-size: 40px;
}

.rooms-title-box i {
  margin-right: 5px;
}

.rooms-list-container {
  margin-top: 20px;
  width: 65vw;
  min-height: 400px;
  background-color: #e8e8e8;
}
.rooms-list-container thead {
  font-size: 25px;
  background-color: #41687e;
  color: #fff;
  font-family: "Titillium Web", sans-serif;
  font-weight: 200;
}

.rooms-list-container tr {
  font-size: 25px;
  color: #41687e;
  font-family: "Titillium Web", sans-serif;
}

.even {
  background-color: #d6d6d6;
}

.room-register-container {
  margin-top: 50px;
  width: 65vw;
  min-height: 200px;
  background-color: #e8e8e8;
}

.room-register-header {
  background-color: #41687e;
  color: #fff;
  height: 30px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: 'Titillium Web', sans-serif;
}

.room-register-body {
  padding: 30px;
  display: flex;
  height: 150px;
  flex-direction: column;
  justify-content: center;
}

.room-register-body div {
  display: flex;
  justify-content: space-around;
}

.register-inputs {
    border: none;
    border-bottom: 1px solid #41687E;
    font-size: 23px;
    background: #0000;
    font-family: 'Titillium Web', sans-serif;
}

.register-btn {
    background-color: #41687E;
    border: none;
    padding: 5px 10px;
    font-family: 'Titillium Web', sans-serif;
    font-size: 20px;
    color: #fff;
    cursor: pointer;
    transition: 0.2s;
}

.room-actions {
    display: flex;
    justify-content: center;
    align-items: center;
}

.edit-btn, .delete-btn {
    margin: 0 5px;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    transition: .2s;
}

.edit-btn {
    background-color: #41687E;
    color: #FFF;
    border: none;
    
}

.delete-btn {
    color: #41687E;
    background-color: #FFF0;
    border: 1px solid #41687E;
}

.edit-btn:hover, .delete-btn:hover, .register-btn:hover {
    filter: brightness(120%);
}
</style>