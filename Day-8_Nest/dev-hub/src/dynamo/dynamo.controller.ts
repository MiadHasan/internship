import { Controller, Post } from '@nestjs/common';
import { DynamoService } from './dynamo.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('dynamo')
export class DynamoController {
  constructor(private dynamoService: DynamoService) {}

  @Public()
  @Post()
  create() {
    return this.dynamoService.create();
  }
}
