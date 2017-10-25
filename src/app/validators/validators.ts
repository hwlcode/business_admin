import {FormControl} from '@angular/forms';

// 数字
export function number(input: FormControl) {
    const val = (input.value || '') + '';
    const reg = /^[0-9]+$/g;
    const valid = reg.test(val);
    return valid ? null : {number: {description: '必需为数字'}};
}
