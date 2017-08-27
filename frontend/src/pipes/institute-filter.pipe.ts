import { Pipe, PipeTransform } from '@angular/core';
import { InstituteInterface } from '../app/interfaces/institute.interface';

@Pipe({
  name: 'instituteFilter'
})
export class InstituteFilterPipe implements PipeTransform {

  transform(institutes: InstituteInterface[], graduation: string, semesterHalf?: number): any {
    return institutes.filter(i => i.graduation === graduation
      && (!semesterHalf || i.semesterHalf === semesterHalf));
  }
}
