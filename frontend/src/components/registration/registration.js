import RegistrationForm from '../registration-form/form.vue';

export default {
  name: 'registration',
  data() {
    return {
      user: {
        name: 'Lars',
      },
      semester: 'WS17',
      startRegistration: false,
    };
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
