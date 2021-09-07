import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'avg'
})
export class AvgPipe implements PipeTransform {

    transform(value: any[], prop: string) {
        if (!Array.isArray(value) || value.length === 0 || !prop) {
            return value;
        }

        let sum = value.reduce((a, b) => a + b[prop], 0);
        return sum / value.length;
    }
}  