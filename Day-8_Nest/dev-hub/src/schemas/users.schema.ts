import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Users {
  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop()
  experience: number;

  @Prop([String])
  skills: string[];

  @Prop()
  refreshToken: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
