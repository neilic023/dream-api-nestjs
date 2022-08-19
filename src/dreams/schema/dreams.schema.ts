import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DreamDocument = Dream & Document;

enum Types {
  Scary = 'scary',
  Happy = 'happy',
  Sad = 'sad',
  Angry = 'angry',
  Excited = 'excited',
}

@Schema()
export class Dream {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  type: Types;

  @Prop({ required: true })
  date: Date;
}

export const DreamSchema = SchemaFactory.createForClass(Dream);
