import { Pipe, Injectable, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sort'
})
@Injectable()
export class ArraySortPipe implements PipeTransform {
    transform(array: any, args: string): Array<string> {
        array.sort((a: any, b: any) => {
            if (a[args] < b[args]) {
                return -1;
            } else if (a[args] > b[args]) {
                return 1;
            } else {
                return 0;
            }
        });
        return array;
    }
}
