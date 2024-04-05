import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { DynamoService } from './dynamo.service';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('dynamo')
export class DynamoController {
  constructor(private dynamoService: DynamoService) {}

  @Public()
  @Post()
  createBook(@Body() createBookDto: CreateBookDto) {
    return this.dynamoService.createBook(createBookDto);
  }

  @Public()
  @Get()
  getBooks() {
    return this.dynamoService.getBooks();
  }

  @Public()
  @Delete()
  deleteBook(@Query('id') id: string) {
    console.log(id, 'controller');
    return this.deleteBook(id);
  }
}
