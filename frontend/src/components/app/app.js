import RegistrationComponent from '../registration/registration.vue';
import Test from '../../service/test.service';

export default {
  name: 'app',
  data() {
    return {
      startRegistration: false,
      user: {
        name: 'Lars',
        matrikel: 3245252,
      },
      semester: 'WS16/17',
    };
  },
  methods: {
    start() {
      this.startRegistration = true;
    },
  },
  components: {
    'registration': RegistrationComponent,
  },
};
