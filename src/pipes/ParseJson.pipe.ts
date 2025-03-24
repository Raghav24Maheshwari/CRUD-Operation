import { PipeTransform, BadRequestException } from '@nestjs/common';

export class ParseJsonPipe implements PipeTransform {
  constructor(private readonly fieldNames: string[]) {}

  transform(value: any) {
    this.fieldNames.forEach((fieldName) => {
      const fieldValue = value[fieldName];
      if (typeof fieldValue === 'object' && fieldValue !== null) {
        return;
      }
      if (typeof fieldValue === 'string') {
        try {
          value[fieldName] = JSON.parse(fieldValue);
          // console.log('This is the field value', value[fieldName]);
        } catch {
          throw new BadRequestException(`Invalid JSON format for ${fieldName}`);
        }
      }
    });
    return value;
  }
}
