import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderEs',
})
export class GenderEsPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'Male':
        return 'Masculino';
      case 'Female':
        return 'Femenino';
      default:
        return value;
    }
  }
}
