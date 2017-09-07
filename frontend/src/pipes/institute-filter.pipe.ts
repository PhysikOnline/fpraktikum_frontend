import { Pipe, PipeTransform } from '@angular/core';
import { Institute } from '../models/institute';

@Pipe({
  name: 'instituteFilter'
})
export class InstituteFilterPipe implements PipeTransform {

  transform(institutes: Institute[], graduation: string, semesterHalf?: number): any {
    return institutes.filter(i => i.graduation === graduation
      && (!semesterHalf || i.semesterHalf === semesterHalf));
  }
}
