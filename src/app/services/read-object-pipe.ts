import { Pipe, Injectable, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ReadObjectPipe',
    pure: false
})

@Injectable()
export class ReadObjectPipe implements PipeTransform {

    transform(value, args: string[]): any {
        const keys = [];
        const values = [];
        for (const key in value) {
            if (value) {
                keys.push(key);
            }
        }
        for (const val in value) {
            if (value) {
                values.push(val);
            }
        }
        return values;
    }
}
