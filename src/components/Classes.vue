<template>
  <div class="classes">
    <div class="classes-title-box">
      <h1><i class="fas fa-users"></i>Turmas</h1>
    </div>
    <div class="classes-list-box">
      <div class="classes-list-container">
        <table width="100%">
          <thead>
            <th width="20%">Código</th>
            <th width="10%">Semestre</th>
            <th width="20%">Disciplina</th>
            <th width="20%">Descrição</th>
            <th width="20%">Professor</th>
            <th width="10%">Ações</th>
          </thead>
          <tbody>
            <tr
              :class="classes.indexOf(collegeClass) % 2 == 0 ? even : ''"
              v-for="collegeClass in classes"
              :key="collegeClass.id"
            >
              <td>{{ collegeClass.class_id }}</td>
              <td>{{ collegeClass.college_semester }}</td>
              <td>{{ collegeClass.subject_name }}</td>
              <td>{{ collegeClass.description }}</td>
              <td>{{ collegeClass.professor_name }}</td>
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
                <select class="register-inputs" name="semester" id="">
                  <option value="" disabled selected>Semestre</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
              </select>
              <select class="register-inputs" name="subject" id="">
                  <option value="" disabled selected>Disciplina</option>
                  <option value="PAA">Projeto e Análise de Algoritmos</option>
                  <option value="CG">Computação Gráfica</option>
              </select>
            </div>
            <div class="input-group">
              <input
                class="register-inputs"
                type="text"
                placeholder="Descrição"
              />
              <select class="register-inputs" name="professor" id="">
                  <option value="" disabled selected>Professor</option>
                  <option value="Paulo André Sperandio Giacomin">Paulo André Sperandio Giacomin</option>
              </select>
            </div>
          </div>
          <button class="register-btn">Salvar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {baseUrl} from '../global'

export default {
    data() {
        return {
            classes: [],
            even: "even"
        }
    },
    methods: {
    async getClasses() {
      try {
        this.classes = await axios.get(`${baseUrl}/classes`)
          .then(res => res.data)
      }
      catch(err) {
        alert("Não foi possível carregar os professores, tente novamente mais tarde.")
      }
    }
  },
  mounted() {
    this.getClasses()
  }
}
</script>

<style>
.classes {
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.classes-title-box {
  display: flex;
  justify-content: flex-start;
  width: 75%;
}

.classes-title-box h1 {
  text-align: start;
  font-family: "Titillium Web", sans-serif;
  font-weight: 400;
  color: #41687e;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  font-size: 40px;
}

.classes-title-box i {
  margin-right: 5px;
}

.classes-list-container {
  margin-top: 20px;
  width: 65vw;
  min-height: 400px;
  background-color: #e8e8e8;
}
.classes-list-container thead {
  font-size: 25px;
  background-color: #41687e;
  color: #fff;
  font-family: "Titillium Web", sans-serif;
  font-weight: 200;
}

.classes-list-container tr {
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
  width: 40%;
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