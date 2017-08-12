import RegistrationForm from '../registration-form/form.vue';
import RegistrationService from '../../service/registration.service';
import EventService from '../../service/event.service';


export default {
  name: 'registration',
  data() {
    return {
      user: {},
      semester: '',
      startRegistration: false,
      registrationService: new RegistrationService(),
    };
  },
  created() {
    this.user = this.registrationService.getUserInfoFromDoc();
    this.registrationService.requestRegistration().then((data) => {
      this.semester = data.semester;
      EventService.$emit('log', 'Got Data');
    },
    (error) => {
      EventService.$emit('error', error);
    });
  },
  methods: {
    start() {
      this.startRegistration = true;
    },
  },
  components: {
    'registration-form': RegistrationForm,
  },
};
