import Config from '../../config';

export default {
  name: 'registration-form',
  props: ['registrationService'],
  data() {
    return {
      graduations: [],
      fullGraduations: Config.GRADUATION_MAP,
      institutes: [],
      institutesMap: {},
      selected: {
        graduation: null,
        partner: {
          name: null,
          account: null,
        },
        notes: null,
        institutes: [],
        onlyOneInstitute: false,
      },
    };
  },
  created() {
    this.institutes = this.registrationService.institutes;
    this.graduations = this.getGraduationsFromInstitutes(this.institutes);
    this.institutesMap = this.getInstitutesMap(this.institutes);
  },
  updated() {
    console.log(this.selected)
  },
  methods: {
    getGraduationsFromInstitutes(institutes) {
      const graduations = [];
      institutes.forEach((i) => {
        const grad = i.graduation;
        if (graduations.indexOf(grad) === -1) {
          graduations.push(grad);
        }
      });
      return graduations;
    },
    getInstitutesMap(institutes) {
      const instituteMap = {};
      this.graduations.forEach((g) => {
        instituteMap[g] = institutes.filter(i => i.graduation === g);
      });
      return instituteMap;
    },
    toggleOnlyOneInstitute() {
      this.selected.onlyOneInstitute = !this.selected.onlyOneInstitute;
    },
    selectInstitute(id) {

    },
    completeRegistration() {
      this.$refs.completeDialog.open();
    },
    onCompleteDialogClose() {
      this.$refs.completeDialog.close();
    },
  },
};
