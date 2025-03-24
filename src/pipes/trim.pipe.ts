import { PipeTransform } from '@nestjs/common';

export class TrimPipe implements PipeTransform {
  constructor(private readonly fieldsToTrim: string[] = []) {}

  transform(value: any) {
    if (!value) {
      return value;
    }

    if (typeof value === 'string') {
      return value.trim();
    }

    this.fieldsToTrim.forEach((key) => {
      if (value[key] && typeof value[key] === 'string') {
        value[key] = value[key].trim();
      }
    });

    return value;
  }
}
