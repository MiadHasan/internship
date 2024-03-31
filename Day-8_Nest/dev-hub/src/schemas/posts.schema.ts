import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Posts {
  @Prop()
  title: string;

  @Prop()
  description: string;
}

export const PostsSchema = SchemaFactory.createForClass(Posts);
