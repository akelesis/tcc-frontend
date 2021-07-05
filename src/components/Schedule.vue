<template>
  <div class="schedule">
    <div class="schedule-title-box">
      <h1><i class="fas fa-calendar-check"></i>Horários</h1>
    </div>
    <div class="filters-container">
      <select v-model="timeSlot.period">
        <option value="" disabled selected>Periodo</option>
        <option value="2019.1">2019.1</option>
        <option value="2019.2">2019.2</option>
        <option value="2020.1">2020.1</option>
        <option value="2020.1">2020.2</option>
        <option value="2021.1">2021.1</option>
      </select>
      <select v-model="timeSlot.semester">
        <option value="" disabled selected>Semestre</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
      </select>
      <div class="btns-container">
        <button @click="getSchedule">Pesquisar</button>
      </div>
    </div>
    <div class="schedule-table-container">
      <table>
        <thead>
          <th width="15%"></th>
          <th width="15%">Segunda</th>
          <th width="15%">Terça</th>
          <th width="15%">Quarta</th>
          <th width="15%">Quinta</th>
          <th width="15%">Sexta</th>
        </thead>
        <tbody>
          <tr class="even">
            <td>07:30</td>
            <td v-for="day in finalSchedule[0]" :key="finalSchedule[0].indexOf(day)">
              <div class="schedule-postit" v-for="subject in day" :key="day.indexOf(subject)">{{subject.subject_name + " - " + subject.description}}</div>
            </td>
          </tr>
          <tr class="odd">
            <td>08:20</td>
            <td v-for="day in finalSchedule[1]" :key="finalSchedule[1].indexOf(day)">
              <div class="schedule-postit" v-for="subject in day" :key="day.indexOf(subject)">{{subject.subject_name + " - " + subject.description}}</div>
            </td>
          </tr>
          <tr class="even">
            <td>09:10</td>
            <td v-for="day in finalSchedule[2]" :key="finalSchedule[2].indexOf(day)">
              <div class="schedule-postit" v-for="subject in day" :key="day.indexOf(subject)">{{subject.subject_name + " - " + subject.description}}</div>
            </td>
          </tr>
          <tr class="odd">
            <td>10:00</td>
            <td v-for="day in finalSchedule[3]" :key="finalSchedule[3].indexOf(day)">
              <div class="schedule-postit" v-for="subject in day" :key="day.indexOf(subject)">{{subject.subject_name + " - " + subject.description}}</div>
            </td>
          </tr>
          <tr class="even">
            <td>10:50</td>
            <td v-for="day in finalSchedule[4]" :key="finalSchedule[4].indexOf(day)">
              <div class="schedule-postit" v-for="subject in day" :key="day.indexOf(subject)">{{subject.subject_name + " - " + subject.description}}</div>
            </td>
          </tr>
          <tr class="odd">
            <td>11:40</td>
            <td v-for="day in finalSchedule[5]" :key="finalSchedule[5].indexOf(day)">
              <div class="schedule-postit" v-for="subject in day" :key="day.indexOf(subject)">{{subject.subject_name + " - " + subject.description}}</div>
            </td>
          </tr>
          <tr class="even">
            <td>13:30</td>
            <td v-for="day in finalSchedule[6]" :key="finalSchedule[6].indexOf(day)">
              <div class="schedule-postit" v-for="subject in day" :key="day.indexOf(subject)">{{subject.subject_name + " - " + subject.description}}</div>
            </td>
          </tr>
          <tr class="odd">
            <td>14:20</td>
            <td v-for="day in finalSchedule[7]" :key="finalSchedule[7].indexOf(day)">
              <div class="schedule-postit" v-for="subject in day" :key="day.indexOf(subject)">{{subject.subject_name + " - " + subject.description}}</div>
            </td>
          </tr>
          <tr class="even">
            <td>15:10</td>
            <td v-for="day in finalSchedule[8]" :key="finalSchedule[8].indexOf(day)">
              <div class="schedule-postit" v-for="subject in day" :key="day.indexOf(subject)">{{subject.subject_name + " - " + subject.description}}</div>
            </td>
          </tr>
          <tr class="odd">
            <td>16:00</td>
            <td v-for="day in finalSchedule[9]" :key="finalSchedule[9].indexOf(day)">
              <div class="schedule-postit" v-for="subject in day" :key="day.indexOf(subject)">{{subject.subject_name + " - " + subject.description}}</div>
            </td>
          </tr>
          <tr class="even">
            <td>16:50</td>
            <td v-for="day in finalSchedule[10]" :key="finalSchedule[10].indexOf(day)">
              <div class="schedule-postit" v-for="subject in day" :key="day.indexOf(subject)">{{subject.subject_name + " - " + subject.description}}</div>
            </td>
          </tr>
          <tr class="odd">
            <td>17:40</td>
            <td v-for="day in finalSchedule[11]" :key="finalSchedule[11].indexOf(day)">
              <div class="schedule-postit"  v-for="subject in day" :key="day.indexOf(subject)">{{subject.subject_name + " - " + subject.description}}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="subjects-list">
      <table>
        <thead>
          <th></th>
          <th>Disciplina</th>
          <th>Turma</th>
          <th>Professor(a)</th>
        </thead>
        <tbody>
          <tr v-for="(schedule, index) in resumedSchedule" :key="index">
            <td></td>
            <td>{{schedule.subject_name}}</td>
            <td>{{schedule.description}}</td>
            <td>{{schedule.professor_name}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="btns-container">
      <button @click="redirect">Novo Horário</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {baseUrl} from '../global'
export default {
  data() {
    return {
      color: ["orange"],
      schedules: [],
      finalSchedule: [],
      resumedSchedule: [],
      timeSlot: {period: "", semester: ""},
      days: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
      times: ['07:30', '08:20', '09:10', '10:00', '10:50', '11:40', '13:30', '14:20', '15:10', '16:00', '16:50', '17:40'],
      colors: ['orange', 'blue', 'green', 'gray', 'purple']
    };
  },
  methods: {
    redirect() {
      this.$router.push("/dashboard/schedule/create")
    },
    async getSchedule() {
      this.schedules = await axios.get(`${baseUrl}/schedule_classes?period=${this.timeSlot.period}&semester=${this.timeSlot.semester}`)
        .then(res => res.data)
      this.organizeSchedule()
      this.resumeSchedule()
      console.log(this.schedules)
    },
    organizeSchedule() {
      for(let i = 0; i < this.times.length; i++) {
        const timeslotSubjects = []
        for(let j = 0; j < this.days.length; j++) {
          const auxSchedule = this.schedules.filter(schedule => schedule.day == this.days[j] && schedule.time == this.times[i])
          timeslotSubjects.push(auxSchedule)
        }
        this.finalSchedule.push(timeslotSubjects)
      }
    },
    resumeSchedule() {
      this.resumedSchedule.push(this.schedules[0])
      let j = 0
      for(let i = 1; i < this.schedules.length; i++){
        if(
          this.schedules[i].subject_name !== this.resumedSchedule[j].subject_name ||
          this.schedules[i].description !== this.resumedSchedule[j].description
          ) {
          this.resumedSchedule.push(this.schedules[i])
          j++
        }
      }
      console.log(this.resumedSchedule)
    },
    randomizeColor() {
      const value = (Math.floor(Math.random() * 5))
      console.log(value)
      return this.colors[value]
    }
  },
  mounted() {
    this.test();
  },
};
</script>

<style>
.schedule {
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Titillium Web", sans-serif;
  font-weight: 200;
  max-height: calc(100vh - 80px);
  overflow-y: auto;
}

.schedule-title-box {
  display: flex;
  justify-content: flex-start;
  width: 75%;
}

.schedule-title-box h1 {
  text-align: start;
  font-family: "Titillium Web", sans-serif;
  font-weight: 400;
  color: #41687e;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  font-size: 40px;
}

.schedule-title-box i {
  margin-right: 5px;
}

.filters-container {
  width: 60vw;
  display: flex;
  justify-content: flex-end;
}

.filters-container select {
  font-size: 20px;
  border: none;
  border-bottom: 1px solid #41687e;
  color: #41687e;
  padding: 0 10px;
  margin: 0 10px;
  font-family: 'Titillium Web', sans-serif;
}

.subjects-list,
.schedule-table-container {
  margin-top: 30px;
  width: 60vw;
  background-color: #e8e8e8;
  font-size: 20px;
}

.subjects-list table,
.schedule-table-container table {
  width: 100%;
}

.subjects-list th,
.schedule-table-container th {
  font-size: 20px;
  background-color: #41687e;
  color: #fff;
  padding: 5px;
  font-weight: 200;
}

.subjects-list tr > :nth-child(1) {
  display: flex;
  justify-content: center;
}

.schedule-table-container td {
  padding: 3px;
  font-size: 18px;
}

.btns-container {
  margin-top: 20px;
}

.btns-container button {
  padding: 10px;
  color: #fff;
  background-color: #41687e;
  border: none;
  font-size: 20px;
  font-family: "Titillium Web", sans-serif;
  transition: .2s;
  cursor: pointer;
}

.btns-container button:hover {
  filter: brightness(120%);
}

.schedule-postit {
  border: 1px solid #777;
  border-radius: 5px;
  background-color: #7495a8;
  color: #fff;
}

.color-container {
  width: 25px;
  height: 25px;
}

.orange {
  background: #e4910d;
  color: #fff;
}

.blue {
  background: #0d95e4;
  color: #fff;
}

.green {
  background: #0de478;
}

.gray {
  background-color: #5d5d5d;
  color: #fff;
}

.purple {
  background-color: #730c7c;
  color: #fff;
}

.even {
  background-color: #d6d6d6;
}

.odd {
  background-color: #e8e8e8;
}
</style>