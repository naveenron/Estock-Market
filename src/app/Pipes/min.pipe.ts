import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'min'
  })
  export class MinPipe implements PipeTransform {
  
    transform(value: any[], prop: string) {
      if (!Array.isArray(value) || value.length === 0 || !prop) { 
        return value;
      }
  
      value.sort((a, b) => a[prop] - b[prop]);
      return value[0][prop];
    }
  }  