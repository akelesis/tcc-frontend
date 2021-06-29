<template>
  <div class="subjects">
    <div class="subjects-title-box">
      <h1><i class="fas fa-book"></i>Disciplinas</h1>
    </div>
    <div class="subjects-list-box">
      <div class="subjects-list-container">
        <table width="100%">
          <thead>
            <th width="10%">Código</th>
            <th width="50%">Nome</th>
            <th width="10%">Semestre</th>
            <th width="10%">C.H.</th>
            <th width="10%">Créditos</th>
            <th width="10%">Ações</th>
          </thead>
          <tbody>
            <tr
              :class="subjects.indexOf(subject) % 2 == 0 ? even : ''"
              v-for="subject in subjects"
              :key="subject.id"
            >
              <td>{{ subject.subject_id }}</td>
              <td>{{ subject.subject_name }}</td>
              <td>{{ subject.semester }}</td>
              <td>{{ subject.workload }}h</td>
              <td>{{ subject.credits }}</td>
              <td class="subject-actions">
                <button class="edit-btn" @click="editSubject(subject.subject_id)">
                  <i class="fas fa-pencil-alt"></i>
                </button>
                <button class="delete-btn" @click="deleteSubject(subject.subject_id)">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="subject-register-box">
      <div class="subject-register-container">
        <div class="subject-register-header">
          <h3>Cadastro / Edição</h3>
        </div>
        <div class="subject-register-body">
          <div>
            <div class="input-group">
              <input
                class="register-inputs"
                v-model="subject.subject_name"
                type="text"
                placeholder="Nome"
              />
              <select
                class="register-inputs"
                v-model="subject.semester"
                name="semester"
                id=""
              >
                <option value="" disabled selected>Semestre</option>
                <option value="1">1º Semestre</option>
                <option value="2">2º Semestre</option>
                <option value="3">3º Semestre</option>
                <option value="4">4º Semestre</option>
                <option value="5">5º Semestre</option>
                <option value="6">6º Semestre</option>
              </select>
            </div>
            <div class="input-group">
              <select
                class="register-inputs"
                v-model="subject.workload"
                name="workload"
                id=""
              >
                <option value="" disabled selected>Carga Horária</option>
                <option value="45">45h</option>
                <option value="60">60h</option>
                <option value="75">75h</option>
                <option value="90">90h</option>
                <option value="120">120h</option>
                <option value="450h">450h</option>
              </select>
              <select
                class="register-inputs"
                v-model="subject.credits"
                name="credits"
                id=""
              >
                <option value="" disabled selected>Créditos</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
          </div>
          <button class="register-btn" v-if="saveMode" @click="postSubject">Salvar</button>
          <button class="register-btn" v-if="!saveMode" @click="putSubject">Atualizar</button>
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
      subjects: [],
      subject: {
        semester: "",
        workload: "",
        credits: ""
      },
      even: "even",
      saveMode: true
    };
  },
  methods: {
    async getSubjects() {
      try {
        this.subjects = await axios
          .get(`${baseUrl}/subjects`)
          .then((res) => res.data);
      } catch (err) {
        alert(
          "Não foi possível carregar os professores, tente novamente mais tarde."
        );
      }
    },
    async postSubject() {
      try {
        const res = await axios
          .post(`${baseUrl}/subjects`, this.subject)
          .then((res) => res.data)
          .then(() => this.subject = clearForms({semester: "", workload: "", credits: ""}))
          .then(() => this.getSubjects());
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },
    editSubject(subjectId) {
        this.saveMode = false
        const aux = this.subjects.find(subject => subject.subject_id == subjectId)
        this.subject = {...aux}
    },
    async putSubject() {
        try {
        const res = await axios
          .put(`${baseUrl}/subjects/${this.subject.subject_id}`, this.subject)
          .then((res) => res.data)
          .then(() => this.resetForm())
          .then(() => this.getSubjects())
          console.log(res)
          this.saveMode = true;
      } catch (err) {
        console.log(err)
      }
    },
    async deleteSubject(subjectId) {
        await axios.delete(`${baseUrl}/subjects/${subjectId}`)
            .then(() => this.getSubjects())
    }
  },
  mounted() {
    this.getSubjects();
  },
};
</script>

<style>
.subjects {
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.subjects-title-box {
  display: flex;
  justify-content: flex-start;
  width: 75%;
}

.subjects-title-box h1 {
  text-align: start;
  font-family: "Titillium Web", sans-serif;
  font-weight: 400;
  color: #41687e;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  font-size: 40px;
}

.subjects-title-box i {
  margin-right: 5px;
}

.subjects-list-container {
  margin-top: 20px;
  width: 65vw;
  min-height: 400px;
  background-color: #e8e8e8;
}
.subjects-list-container thead {
  font-size: 25px;
  background-color: #41687e;
  color: #fff;
  font-family: "Titillium Web", sans-serif;
  font-weight: 200;
}

.subjects-list-container tr {
  font-size: 25px;
  color: #41687e;
  font-family: "Titillium Web", sans-serif;
}

.even {
  background-color: #d6d6d6;
}

.subject-register-container {
  margin-top: 50px;
  width: 65vw;
  min-height: 200px;
  background-color: #e8e8e8;
}

.subject-register-header {
  background-color: #41687e;
  color: #fff;
  height: 30px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: "Titillium Web", sans-serif;
}

.subject-register-body {
  padding: 30px;
  display: flex;
  height: 150px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.subject-register-body div {
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
  padding: 0 5px;
  outline: none;
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

.subject-actions {
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