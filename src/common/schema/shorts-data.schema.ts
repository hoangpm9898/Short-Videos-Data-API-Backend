import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ShortDataDocument = ShortData & Document;

class ShortDataUser {
  @Prop() id: number;
  @Prop() first_name: string;
  @Prop() last_name: string;
  @Prop() username: string;
  @Prop() slug: string;
  @Prop() location: string;
  @Prop({ type: Object }) avatar: {
    small: string;
    medium: string;
    large: string;
  };
  @Prop() hero: boolean;

}

class ShortDataFile {
  @Prop() quality: string;
  @Prop() width: number;
  @Prop() height: number;
  @Prop() fps: number;
  @Prop() link: string;
}

@Schema({ collection: 'shorts_data' })
export class ShortData {
  @Prop() _id: number;
  @Prop() title: string;
  @Prop() description: string;
  @Prop() user: ShortDataUser;
  @Prop([String]) tags: string[];
  @Prop() video: ShortDataFile;
  @Prop() provider: string;
}

export const ShortDataSchema = SchemaFactory.createForClass(ShortData);
