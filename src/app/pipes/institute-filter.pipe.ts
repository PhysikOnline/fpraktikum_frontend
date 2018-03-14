import { Pipe, PipeTransform } from '@angular/core';
import { Institute } from '../models/institute';

@Pipe({
  name: 'instituteFilter',
})
export class InstituteFilterPipe implements PipeTransform {
  transform(institutes: Institute[], semesterHalf?: number): any {
    return institutes
      .filter(i => !semesterHalf || i.semesterHalf === semesterHalf)
      .sort((a, b) => {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
  }
}
