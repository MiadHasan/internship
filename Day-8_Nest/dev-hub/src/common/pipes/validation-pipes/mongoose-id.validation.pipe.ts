import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class MongoIdValidationPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, _metadata: ArgumentMetadata) {
    if (!Types.ObjectId.isValid(value))
      throw new BadRequestException('Invalid id!');
    return value;
  }
}
