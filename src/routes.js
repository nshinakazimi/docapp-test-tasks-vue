import RoomList from './components/lists/index.vue';
import RoomDetails from './components/details/index.vue';

const routes = [
  { path: '/', component: RoomList },
  { path: '/room/:id', component: RoomDetails },
];

export default routes;
