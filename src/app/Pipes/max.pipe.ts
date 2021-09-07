import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'max'
  })
  export class MaxPipe implements PipeTransform {
  
    transform(value: any[], prop: string) {
      if (!Array.isArray(value) || value.length === 0 || !prop) { 
        return value;
      }
  
      value.sort((a, b) => b[prop] - a[prop]);
      return value[0][prop];
    }
  }