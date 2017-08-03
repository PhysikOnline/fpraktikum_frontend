export default {
  name: 'form',
  data() {
    return {
      graduations: ['BA'],
      fullGraduations: {
        BA: 'Bachelor',
        MA: 'Master',
        LA: 'Lehramt',
      },
      institutes: [
        {
          id: 324235,
          name: 'IAP',
          graduation: 'BA',
          places: 20,
          free: 10,
          waiting: 0,
          half: 0,
        },
        {
          id: 324243235,
          name: 'IAP',
          graduation: 'BA',
          places: 20,
          free: 10,
          waiting: 0,
          half: 1,
        },
        {
          id: 3252,
          name: 'PI',
          graduation: 'BA',
          places: 10,
          free: 10,
          waiting: 0,
          half: 0,
        },
        {
          id: 3232452,
          name: 'PI',
          graduation: 'BA',
          places: 10,
          free: 10,
          waiting: 0,
          half: 1,
        },
        {
          id: 324658658235,
          name: 'IKF',
          graduation: 'BA',
          half: 0,
          places: 20,
          free: 10,
          waiting: 0,
        },
      ],
      instituteNames: {},
      institutesByGradAndHalf: {},
      selected: {
        graduation: null,
        partner: {
          name: null,
          account: null,
        },
        institutes: [],
        instituteNamesOnly: true,
        onlyOneInstitute: false,
      },
    };
  },
  created() {
    this.instituteNames = this.getInstituteNamesByGrad(this.institutes);
    this.institutesByGradAndHalf = this.getInstitutesByHalfAndGrad(this.institutes);
  },
  updated() {
    console.log(this.selected);
  },
  methods: {
    selectInstitute(id) {
      const institute = this.institutes.find(i => i.id === id);
      console.log(institute.name);

    },
    toggleInstitutesNameOnly(event) {
      this.selected.instituteNamesOnly = !event;
    },
    toggleOnlyOneInstitute(event) {
      this.selected.onlyOneInstitute = event;
    },
    getInstituteNamesByGrad(institutes) {
      const result = {};

      for (const i of institutes) {
        const grad = i.graduation;
        if (!result[grad]) {
          result[grad] = [];
        }
        if (result[grad].indexOf(i.name) === -1) {
          result[grad].push(i.name);
        }
      }

      return result;
    },
    getInstitutesByHalfAndGrad(institutes) {
      const result = {};

      for (const i of institutes) {
        const grad = i.graduation;
        const half = i.half;

        if (!result[grad]) {
          result[grad] = {};
        }
        if (!result[grad][half]) {
          result[grad][half] = [];
        }
        if (!result[grad][half].find(f => f === i)) {
          result[grad][half].push(i);
        }
      }

      return result;
    }
  }
};
