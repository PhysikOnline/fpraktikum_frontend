import { InstituteInterface } from './institute.interface';

export interface UserInterface {
  firstName: string,
  lastName: string,
  sNumber: string,
  graduation: string,
  email: string,
  institutes: InstituteInterface[],
  status: string,
  partner: {
    firstName: string,
    lastName: string,
    sNumber: string,
    email: string,
    institutes: InstituteInterface[],
  },
}
