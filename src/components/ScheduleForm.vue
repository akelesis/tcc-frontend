<template>
  <div class="schedule-form">
    <div class="schedule-title-box">
      <h1><i class="fas fa-calendar-check"></i>Horários - Criação</h1>
    </div>
    <div class="agenda-creation-form">
        <select name="" id="">
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
        <select name="" id="">
            <option value="" disabled selected>Turma</option>
            <option v-for="collegeClass in classes" :key="collegeClass.class_id" :value="collegeClass">{{collegeClass.subject_name + " - " + collegeClass.description}}</option>
        </select>
        <select name="" id="">
            <option value="" disabled selected>Dia</option>
            <option v-for="day in days" :key="day" :value="day">{{day}}</option>
        </select>
        <select name="" id="">
            <option value="" disabled selected>Horário</option>
            <option v-for="time in times" :key="time" :value="time">{{time}}</option>
        </select>
         <select name="" id="">
            <option value="" disabled selected>Sala</option>
            <option v-for="room in rooms" :key="room.room_id" :value="room">{{room.room_name}}</option>
        </select>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            classes: [{
                class_id: 1,
                subject_name: "Projeto e Análise de Algoritmos",
                description: "turma 1"
            }],
            rooms: [{
                room_id: 1,
                room_name: "17B"
            }],
            times: ["07:30", "08:20", "09:10", "10:00", "10:50", "11:40", "12:30", "13:30", "14:20", "15:10", "16:00", "16:50", "17:40"],
            days: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"]
        }
    }
}
</script>

<style>
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

.agenda-creation-form {
    width: 75%;
    background-color: #e6e6e6;
    margin-top: 20px;
}

.agenda-creation-form select {
    border: none;
    border-bottom: 1px solid #41687e;
    font-size: 20px;
    margin: 5px;
    color:#41687e;
    font-family: 'Titillium Web', sans-serif;
    background: #0000;
}

</style>