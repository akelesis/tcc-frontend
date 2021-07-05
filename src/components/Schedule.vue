<template>
  <div class="schedule">
    <div class="schedule-title-box">
      <h1><i class="fas fa-calendar-check"></i>Horários</h1>
    </div>
    <div class="filters-container">
      <select name="" id="">
        <option value="" disabled selected>Periodo</option>
        <option value="2019.1">2019.1</option>
        <option value="2019.2">2019.2</option>
        <option value="2020.1">2020.1</option>
        <option value="2020.1">2020.2</option>
        <option value="2020.1">2021.1</option>
      </select>
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
      <div class="btns-container">
        <button>Pesquisar</button>
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
          <tr
            v-for="schedule in schedules"
            :class="schedules.indexOf(schedule) % 2 == 0 ? 'even' : 'odd'"
            :key="schedule.time"
          >
            <td>{{ schedule.time }}</td>
            <td v-for="day in schedule.days" :key="day.day">
              {{ day.subject_name }}
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
          <tr>
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
export default {
  data() {
    return {
      color: ["orange"],
      schedules: [
        {
          time: "7:30",
          days: [],
        },
        {
          time: "8:20",
          days: [],
        },
        {
          time: "9:10",
          days: [],
        },
        {
          time: "10:50",
          days: [],
        },
        {
          semester: "1",
          time: "11:40",
          days: [],
        },
        {
          time: "12:30",
          days: [],
        },
        {
          time: "13:30",
          days: [],
        },
        {
          time: "14:20",
          days: [],
        },
        {
          time: "15:10",
          days: [],
        },
        {
          time: "16:00",
          days: [],
        },
        {
          time: "16:50",
          days: [],
        },
        {
          time: "17:40",
          days: [],
        },
      ],
    };
  },
  methods: {
    redirect() {
      this.$router.push("/dashboard/schedule/create")
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

.color-container {
  width: 25px;
  height: 25px;
}

.orange {
  background: #e4910d;
}

.even {
  background-color: #d6d6d6;
}

.odd {
  background-color: #e8e8e8;
}
</style>