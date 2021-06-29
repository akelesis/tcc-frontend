<template>
  <div class="professors">
    <div class="professors-title-box">
      <h1><i class="fas fa-chalkboard-teacher"></i>Professores</h1>
    </div>
    <div class="professors-list-box">
      <div class="professors-list-container">
        <table width="100%">
          <thead>
            <th width="10%">Código</th>
            <th width="30%">Nome</th>
            <th width="20%">Departamento</th>
            <th width="25%">Email</th>
            <th width="15%">Ações</th>
          </thead>
          <tbody>
            <tr
              :class="professors.indexOf(professor) % 2 == 0 ? even : ''"
              v-for="professor in professors"
              :key="professor.id"
            >
              <td>{{ professor.professor_id }}</td>
              <td>{{ professor.professor_name }}</td>
              <td>{{ professor.department }}</td>
              <td>{{ professor.email }}</td>
              <td class="class-actions">
                <button class="edit-btn">
                  <i class="fas fa-pencil-alt"></i>
                </button>
                <button class="delete-btn">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="class-register-box">
      <div class="class-register-container">
        <div class="class-register-header">
          <h3>Cadastro / Edição</h3>
        </div>
        <div class="class-register-body">
          <div>
            <div class="input-group">
              <input class="register-inputs" type="text" v-model="professor.professor_name" placeholder="Nome" />
              <select class="register-inputs" v-model="professor.department" name="department" id="">
                <option value="" disabled selected>Departamento</option>
                <option value="DCET">DCET</option>
              </select>
              <input class="register-inputs" type="text" v-model="professor.email" placeholder="Email" />
            </div>
          </div>
          <button class="register-btn" @click="postProfessor">Salvar</button>
        </div>
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
      professors: [],
      even: "even",
      saveMode: true,
      professor: {
          department: ""
      }
    };
  },
  methods: {
    async getProfessors() {
      try {
        this.professors = await axios
          .get(`${baseUrl}/professors`)
          .then((res) => res.data);
      } catch (err) {
        alert(
          "Não foi possível carregar os professores, tente novamente mais tarde."
        );
      }
    },
    async postProfessor() {
      await axios
        .post(`${baseUrl}/professors`, this.professor)
        .then(() => this.getProfessors())
        .then(() => this.professor = clearForms({department: ""}));
    },
  },
  mounted() {
    this.getProfessors();
  },
};
</script>

<style>
.professors {
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.professors-title-box {
  display: flex;
  justify-content: flex-start;
  width: 75%;
}

.professors-title-box h1 {
  text-align: start;
  font-family: "Titillium Web", sans-serif;
  font-weight: 400;
  color: #41687e;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  font-size: 40px;
}

.professors-title-box i {
  margin-right: 5px;
}

.professors-list-container {
  margin-top: 20px;
  width: 65vw;
  min-height: 400px;
  background-color: #e8e8e8;
}
.professors-list-container thead {
  font-size: 25px;
  background-color: #41687e;
  color: #fff;
  font-family: "Titillium Web", sans-serif;
  font-weight: 200;
}

.professors-list-container tr {
  font-size: 25px;
  color: #41687e;
  font-family: "Titillium Web", sans-serif;
}

.even {
  background-color: #d6d6d6;
}

.class-register-container {
  margin-top: 50px;
  width: 65vw;
  min-height: 200px;
  background-color: #e8e8e8;
}

.class-register-header {
  background-color: #41687e;
  color: #fff;
  height: 30px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: "Titillium Web", sans-serif;
}

.class-register-body {
  padding: 30px;
  display: flex;
  height: 150px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.class-register-body div {
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
  margin: 5px;
  width: 30%;
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

.class-actions {
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