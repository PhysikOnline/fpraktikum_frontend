import FormComponent from '../form/form.vue';

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
    'registration-form': FormComponent,
  },
};
