import RegistrationComponent from '../registration/registration.vue';
import EventService from '../../service/event.service';

export default {
  name: 'app',
  data() {
    return {
      startRegistration: false,
      alertMessage: '',
      errorMessage: '',
    };
  },
  mounted() {
    EventService.$on('log', (message) => {
      this.alertMessage = message;
      this.$refs.alertLog.open();
    });
    EventService.$on('error', (message) => {
      this.errorMessage = message;
      this.$refs.errorDialog.open();
    });
  },
  methods: {
    start() {
      this.startRegistration = true;
    },
  },
  components: {
    registration: RegistrationComponent,
  },
};
