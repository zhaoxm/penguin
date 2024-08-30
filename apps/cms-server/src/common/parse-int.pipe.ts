import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(metadata.type);
    console.log(metadata.metatype);
    console.log(metadata.data);
    return Number(value);
  }
}
