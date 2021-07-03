<template>
  <div class="classes">
    <div class="classes-title-box">
      <h1><i class="fas fa-users"></i>Turmas</h1>
    </div>
    <div class="classes-list-box">
      <div class="classes-list-container">
        <table width="100%">
          <thead>
            <th width="10%">Código</th>
            <th width="10%">Semestre</th>
            <th width="20%">Disciplina</th>
            <th width="15%">Descrição</th>
            <th width="35%">Professor</th>
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
                <input type="text" class="register-inputs" v-model="period" placeholder="Ano e periodo letivo" name="" id="">
              <select class="register-inputs" v-model="targetClass.subject_id" name="subject" id="">
                  <option value="" disabled selected>Disciplina</option>
                  <option v-for="subject in subjects" :key="subject.subject_id" :value="subject.subject_id">{{subject.subject_name}}</option>
              </select>
            </div>
            <div class="input-group">
              <input
                class="register-inputs"
                type="text"
                placeholder="Descrição"
                v-model="targetClass.description"
              />
              <select class="register-inputs" v-model="professorId" name="professor" id="">
                  <option value="" disabled selected>Professor</option>
                  <option v-for="professor in professors" :key="professor.professor_id" :value="professor.professor_id">{{professor.professor_name}}</option>
              </select>
            </div>
          </div>
          <button class="register-btn" @click="postClass">Salvar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {baseUrl, clearForms} from '../global'

export default {
    data() {
        return {
            classes: [],
            targetClass: {
                college_semester: "",
                subject_id: ""
            },
            professorId: "",
            professors: [],
            subjects: [],
            even: "even",
            period: ""
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
    },
    async getProfessors() {
        try {
            this.professors = await axios.get(`${baseUrl}/professors`).then(res => res.data)
        }
        catch(err) {
            console.log(err)
        }
    },
    async getSubjects() {
        try {
            this.subjects = await axios.get(`${baseUrl}/subjects`).then(res => res.data)
        }
        catch(err) {
            console.log(err)
        }
    },
    async postClass() {
        try {
            const class_id = await axios.post(`${baseUrl}/classes`, this.targetClass).then(res => res.data)
            const professor_id = this.professorId
            await axios.post(`${baseUrl}/professor_classes`, {class_id, professor_id})
            this.getClasses()
            this.targetClass = clearForms({college_semester: "", subject_id: ""})
        }
        catch(err) {
            console.log(err)
        }
    }
  },
  mounted() {
    this.getClasses()
    this.getProfessors()
    this.getSubjects()
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