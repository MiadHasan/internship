import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Comments {
  @Prop()
  comment: string;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
