<template>
  <div class="rooms">
    <div class="rooms-title-box">
      <h1><i class="fas fa-door-open"></i>Salas</h1>
    </div>
    <div class="rooms-list-box">
      <div class="rooms-list-container">
        <table width="100%">
          <thead>
            <th width="10%">Código</th>
            <th width="20%">Nome</th>
            <th width="20%">Tipo</th>
            <th width="20%">Capacidade</th>
            <th width="20%">Estações</th>
            <th width="10%">Ações</th>
          </thead>
          <tbody>
            <tr
              :class="rooms.indexOf(element) % 2 == 0 ? even : ''"
              v-for="element in rooms"
              :key="element.id"
            >
              <td>{{ element.room_id }}</td>
              <td>{{ element.name }}</td>
              <td>{{ element.type }}</td>
              <td>{{ element.capacity }}</td>
              <td>{{ element.terminals_quantity }}</td>
              <td class="room-actions">
                <button class="edit-btn" @click="editRoom(element.room_id)">
                  <i class="fas fa-pencil-alt"></i>
                </button>
                <button class="delete-btn" @click="deleteRoom(element.room_id)">
                  <i class="fas fa-trash-alt"></i>
                </button>
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
            <div class="input-group">
              <input class="register-inputs" v-model="room.name" type="text" placeholder="Nome" />
              <select name="type" v-model="room.type" class="register-inputs">
                <option value="" disabled selected>Tipo</option>
                <option value="Laboratório">Laboratório</option>
                <option value="Sala">Sala</option>
              </select>
            </div>
            <div class="input-group">
              <input
                class="register-inputs"
                type="text"
                v-model="room.capacity"
                placeholder="Capacidade"
              />
              <input
                class="register-inputs"
                type="text"
                v-model="room.terminals_quantity"
                placeholder="Estações"
              />
            </div>
          </div>
        </div>
        <button class="register-btn" v-if="saveMode" @click="postRoom">Salvar</button>
        <button class="register-btn" v-if="!saveMode" @click="putRoom">Atualizar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { baseUrl, clearForms } from "../global";
export default {
  data() {
    return {
      rooms: [],
      room: {
        type: ""
      },
      even: "even",
      saveMode: true
    };
  },
  methods: {
    async getRooms() {
      try {
        this.rooms = await axios
          .get(`${baseUrl}/rooms`)
          .then((res) => res.data);
      } catch (err) {
        alert(
          "Não foi possível carregar as salas, tente novamente mais tarde."
        );
      }
    },
    async postRoom() {
      await axios.post(`${baseUrl}/rooms`, this.room)
        .then(() => this.getRooms())
        .then(() => this.room = clearForms({type: ""}));
    },
    editRoom(roomId) {
      console.log(roomId)
      const aux = this.rooms.find(room => room.room_id == roomId)
      this.room = {...aux}
      this.saveMode = false
    },
    async putRoom(){
      await axios.put(`${baseUrl}/rooms/${this.room.room_id}`, this.room)
        .then(() => this.getRooms())
        .then(() => this.clearForm());
    },
     async deleteRoom(roomId) {
        await axios.delete(`${baseUrl}/rooms/${roomId}`)
            .then(() => this.getRooms())
    }

  },
  mounted() {
    this.getRooms();
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
  font-family: "Titillium Web", sans-serif;
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
  flex-wrap: wrap;
  justify-content: center;
}

.input-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 0 5px 0;
}

.register-inputs {
  border: none;
  border-bottom: 1px solid #41687e;
  font-size: 23px;
  background: #0000;
  font-family: "Titillium Web", sans-serif;
}

.register-btn {
  background-color: #41687e;
  border: none;
  padding: 5px 10px;
  font-family: "Titillium Web", sans-serif;
  font-size: 20px;
  color: #fff;
  cursor: pointer;
  transition: 0.2s;
  margin: 5px;
  width: 100px;
}

.room-actions {
  display: flex;
  justify-content: center;
  align-items: center;
}

.edit-btn,
.delete-btn {
  margin: 0 5px;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  transition: 0.2s;
}

.edit-btn {
  background-color: #41687e;
  color: #fff;
  border: none;
}

.delete-btn {
  color: #41687e;
  background-color: #fff0;
  border: 1px solid #41687e;
}

.edit-btn:hover,
.delete-btn:hover,
.register-btn:hover {
  filter: brightness(120%);
}
</style>