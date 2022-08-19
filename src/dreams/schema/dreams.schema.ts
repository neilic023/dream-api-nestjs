import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DreamDocument = Dream & Document;

export enum Types {
  Scary = 'scary',
  Happy = 'happy',
  Sad = 'sad',
  Angry = 'angry',
  Excited = 'excited',
}

@Schema({ timestamps: true })
export class Dream {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  type: Types;

  @Prop({ required: true })
  date: string;
}

export const DreamSchema = SchemaFactory.createForClass(Dream);
