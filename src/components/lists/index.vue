<template>
  <div v-if="rooms.length">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Room Number</th>
          <th scope="col">Name</th>
          <th scope="col">Status</th>
          <th scope="col">Appointment Time</th>
          <th scope="col">Doctor's Name</th>
          <th scope="col">Assistant Name</th>
        </tr>
      </thead>
      <tbody>
        <room-list-item
          v-for="room in rooms"
          v-bind:room="room"
          v-bind:key="room.code"
          v-on:click.native="goToRoom(room.code)"
        ></room-list-item>
      </tbody>
    </table>
  </div>
</template>

<script>
import RoomListItem from "./RoomList.vue";
import Services from "../../Services/Room.services";

export default {
  name: "room-list",
  components: { RoomListItem },
  data() {
    return {
      rooms: [],
    };
  },
  created() {
    this.initRooms();
  },
  methods: {
    goToRoom: function (code) {
      this.$router.push(`/room/${code}`);
    },
    async initRooms() {
      const res = await Services.getRooms();

      if (res && res.length) {
        this.rooms = res;
      }
    },
  },
};
</script>
