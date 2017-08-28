import { InstituteFilterPipe } from './institute-filter.pipe';

describe('InstituteFilterPipe', () => {
  let pipe: InstituteFilterPipe;

  const institutes = [
    {
      name: 'IAP',
      places: 20,
      graduation: 'BA',
      semesterHalf: 1,
    },
    {
      name: 'IAP',
      places: 20,
      graduation: 'BA',
      semesterHalf: 2,
    },
    {
      name: 'IAP',
      places: 20,
      graduation: 'MA',
      semesterHalf: 1,
    },
    {
      name: 'IAP',
      places: 20,
      graduation: 'MA',
      semesterHalf: 2,
    },
    {
      name: 'IAP',
      places: 25,
      graduation: 'LA',
      semesterHalf: 1,
    },
    {
      name: 'PI',
      places: 10,
      graduation: 'LA',
      semesterHalf: 2,
    },
  ];

  beforeEach(() => {
    pipe = new InstituteFilterPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter out by graduation', () => {
    const graduation = 'BA';
    const filteredInstitutes = pipe.transform(institutes, graduation);
    expect(filteredInstitutes.every(i => i.graduation === graduation)).toBeTruthy();
  });

  it('should filter out by graduation and semesterhalf', () => {
    const graduation = 'BA';
    const semesterHalf = 1;
    const filteredInstitutes = pipe.transform(institutes, graduation, semesterHalf);
    expect(filteredInstitutes.every(i => i.graduation === graduation
      && i.semesterHalf === semesterHalf)).toBeTruthy();
  });
});
