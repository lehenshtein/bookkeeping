import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'bkmoment'
})

export class MomentPipes implements PipeTransform {
  transform(value: string, formatFrom: string, formatTo: string = 'DD.MM.YYYY'): any {
    return moment(value, formatFrom).format(formatTo);
  }
}
