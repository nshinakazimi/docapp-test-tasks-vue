<template>
	<tr>
    <td>Room {{room.code}} ({{room.appointment.code}})</td>
    <td>{{room.appointment.first_name}} {{room.appointment.last_name}}</td>
    <td>{{room.status.title}}</td>
    <td>{{appointmentTime}} / {{timeLastUpdate}}</td>
    <td>D: {{room.appointment.doctor_title}}</td>
    <td>A: {{room.appointment.assistant}}</td>    
  </tr>
</template>

<script>
  import * as moment from 'moment';

	export default {
	  name: 'room-list-item',
    props: ['room'],
    data() {
      return {
        appointmentTime: moment(this.room.appointment.start_time, 'HH:mm').format('hh:mm A'),
        timeLastUpdate: 0
      }
    },
    created() {
      this.getLastUpdate();
      this.realTime = setInterval(() => {
        this.getLastUpdate();
      }, 1000)
    },
    beforeDestroy() {
      clearInterval(this.realTime);
    },
		methods: {
      getLastUpdate() {
        const prev = moment(this.appointmentTime, 'hh:mm A');

        const diff = moment().diff(prev);

        this.timeLastUpdate = moment.utc(diff).format('HH:mm:ss');

      }
		}
  }
  
</script>
