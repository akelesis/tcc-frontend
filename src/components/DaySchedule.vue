<template>
  <div class="day-schedule">
    <h3>{{day}}</h3>
    <table>
      <thead>
        <th width="10%">Horário</th>
        <th width="35%">Disciplina</th>
        <th width="35%">Professor</th>
        <th width="10%">Sala</th>
        <th width="10%">Excluir</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in schedule" :key="index">
          <td>{{ item.time }}</td>
          <td>{{ item.subject_name }}</td>
          <td>{{ item.professor_name }}</td>
          <td>{{ item.name }}</td>
          <td>
              <button class="timeslot-delete" @click="deleteTimeSlot(item)"><i class="fas fa-trash-alt"></i></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import {baseUrl} from '../global'
export default {
    props: ['day', 'schedule', 'reload'],
    methods: {
        async deleteTimeSlot(timeslot) {
            try{
                await axios.delete(`${baseUrl}/schedule_classes/${timeslot.time_room_id}`)
                this.reload()
            }
            catch(err) {
                console.log(err)
            }
        }
    }
};
</script>

<style>

.day-schedule {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 20px;
  color:#41687e;
}

.day-schedule table {
    width: 100%;
}

.timeslot-delete {
    color:#41687e;
    border: none;
}
</style>