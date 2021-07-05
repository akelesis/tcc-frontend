<template>
  <div class="schedule-form">
    <div class="schedule-title-box">
      <h1><i class="fas fa-calendar-check"></i>Horários - Criação</h1>
    </div>
    <div class="error-tooltip" v-if="error">
      {{ errorMessage }}
      <button @click="closeErrors">X</button>
    </div>
    <div class="period-picker-container">
      <select
        :disabled="semesterFlag"
        @change="disableSemester"
        v-model="timeSlot.period"
        name=""
        id=""
      >
        <option value="" disabled selected>Periodo</option>
        <option
          v-for="period in periods"
          :key="period.college_semester"
          :value="period.college_semester"
        >
          {{ period.college_semester }}
        </option>
      </select>
    </div>
    <div v-if="!timeSlot.period" class="advice-area">
      Selecione um semestre para iniciar!
    </div>
    <div v-if="timeSlot.period" class="agenda-creation-form">
      <select v-model="timeSlot.semester" @change="setUpEnv" name="" id="">
        <option value="" disabled selected>Semestre</option>
        <option v-for="semester in semesters" :key="semester" :value="semester">
          {{ semester }}
        </option>
      </select>
      <select
        :disabled="collegeClassFlag"
        v-model="timeSlot.class_id"
        name=""
        id=""
      >
        <option value="" disabled selected>Turma</option>
        <option
          v-for="collegeClass in classes"
          :key="collegeClass.class_id"
          :value="collegeClass.class_id"
        >
          {{ collegeClass.subject_name + " - " + collegeClass.description }}
        </option>
      </select>
      <select v-model="timeSlot.day" name="" id="">
        <option value="" disabled selected>Dia</option>
        <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
      </select>
      <select v-model="timeSlot.time" name="" id="">
        <option value="" disabled selected>Horário</option>
        <option v-for="time in times" :key="time" :value="time">
          {{ time }}
        </option>
      </select>
      <select v-model="timeSlot.room_id" name="" id="">
        <option value="" disabled selected>Sala</option>
        <option v-for="room in rooms" :key="room.room_id" :value="room.room_id">
          {{ room.name }}
        </option>
      </select>
      <button class="class-reg-btn" @click="postSchedule">Cadastrar</button>
    </div>
    <div v-if="timeSlot.period" class="result-table">
      <h2>Quadro de horários para o {{ timeSlot.semester }}º semestre</h2>
      <div class="semester-schedule-chart">
        <day-schedule day="Segunda" :schedule="monday" :reload="getSchedule" />
        <day-schedule day="Terça" :schedule="tuesday" :reload="getSchedule" />
        <day-schedule
          day="Quarta"
          :schedule="wednesday"
          :reload="getSchedule"
        />
        <day-schedule day="Quinta" :schedule="thursday" :reload="getSchedule" />
        <day-schedule day="Sexta" :schedule="friday" :reload="getSchedule" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { baseUrl } from "../global";
import DaySchedule from "./DaySchedule.vue";
export default {
  components: {
    DaySchedule,
  },
  data() {
    return {
      error: false,
      errorMessage: "",
      classes: [],
      timeSlot: {
        semester: "",
        period: "",
        class_id: "",
        room_id: "",
        day: "",
        time: "",
      },
      collegeClassFlag: true,
      rooms: [
        {
          room_id: 2,
          room_name: "18B",
        },
      ],
      times: [
        "07:30",
        "08:20",
        "09:10",
        "10:00",
        "10:50",
        "11:40",
        "12:30",
        "13:30",
        "14:20",
        "15:10",
        "16:00",
        "16:50",
        "17:40",
      ],
      days: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"],
      semesters: [1, 2, 3, 4, 5, 6, 7, 8],
      semesterFlag: false,
      periods: [],
      schedule: [],
    };
  },
  methods: {
    closeErrors() {
      this.error = false;
    },
    async getClasses() {
      try {
        this.classes = await axios
          .get(
            `${baseUrl}/schedule/classes?period=${this.timeSlot.period}&semester=${this.timeSlot.semester}`
          )
          .then((res) => res.data);
        this.classes.length > 0 ? (this.collegeClassFlag = false) : "";
      } catch (err) {
        console.log(err);
      }
    },
    async postSchedule() {
      try {
        const conflictVerification = await this.verifyConflicts();
        if (!conflictVerification.error) {
          await axios
            .post(`${baseUrl}/schedule_classes`, this.timeSlot)
            .then((res) => res.data);
          this.getSchedule();
        } else throw conflictVerification;
      } catch (err) {
        this.errorMessage = err.msg;
        this.error = true;
      }
    },
    async getSchedule() {
      try {
        this.schedule = await axios
          .get(
            `${baseUrl}/schedule_classes?period=${this.timeSlot.period}&semester=${this.timeSlot.semester}`
          )
          .then((res) => res.data);
      } catch (err) {
        console.log(err);
      }
    },
    setUpEnv() {
      this.getClasses();
      this.getSchedule();
    },
    disableSemester() {
      this.semesterFlag = true;
    },
    async getPeriods() {
      this.periods = await axios
        .get(`${baseUrl}/periods`)
        .then((res) => res.data);
    },
    async getRooms() {
      this.rooms = await axios.get(`${baseUrl}/rooms`).then((res) => res.data);
    },
    async verifyConflicts() {
      try {
        await axios.post(`${baseUrl}/conflicts/professor_and_time`, this.timeSlot);
        await axios.post(`${baseUrl}/conflicts/room_and_time`, this.timeSlot);
        return "Ok"
      } catch (err) {
        return err.response.data;
      }
    },
  },
  mounted() {
    this.getPeriods();
    this.getRooms();
  },
  computed: {
    monday() {
      return this.schedule.filter((item) => item.day == "Segunda");
    },
    tuesday() {
      return this.schedule.filter((item) => item.day == "Terça");
    },
    wednesday() {
      return this.schedule.filter((item) => item.day == "Quarta");
    },
    thursday() {
      return this.schedule.filter((item) => item.day == "Quinta");
    },
    friday() {
      return this.schedule.filter((item) => item.day == "Sexta");
    },
  },
};
</script>

<style>
.error-tooltip {
  padding: 10px;
  min-height: 10px;
  background-color: #41687e;
  color: #fff;
  position: absolute;
  box-shadow: 3px 3px 5px #555;
  animation-name: soft-appear;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}

.error-tooltip button {
  background-color: #0000;
  color: #fff;
  border: none;
  margin-left: 20px;
}

.schedule-form {
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

.advice-area {
  margin-top: 50px;
  font-size: 30px;
}

.agenda-creation-form {
  width: 75%;
  background-color: #e6e6e6;
  margin-top: 20px;
}

.period-picker-container {
  width: 75%;
  display: flex;
  justify-content: flex-start;
}

.period-picker-container select,
.agenda-creation-form select {
  border: none;
  border-bottom: 1px solid #41687e;
  font-size: 20px;
  margin: 5px;
  color: #41687e;
  font-family: "Titillium Web", sans-serif;
  background: #0000;
}

.result-table {
  margin-top: 50px;
  width: 75%;
  background-color: #e6e6e6;
}

.result-table h2 {
  font-weight: 200;
  font-size: 1.6em;
}

.result-table h3 {
  font-weight: 200;
  font-size: 1.4em;
}

.class-reg-btn {
  padding: 5px;
  color: #fff;
  background-color: #41687e;
  border: none;
  font-size: 15px;
  font-family: "Titillium Web", sans-serif;
  transition: 0.2s;
  cursor: pointer;
  margin-left: 5px;
}

@keyframes soft-appear {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>