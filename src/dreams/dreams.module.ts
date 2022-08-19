import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DreamSchema, Dream } from './schema/dreams.schema';
import { DreamsService } from './dreams.service';
import { DreamsController } from './dreams.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Dream.name, schema: DreamSchema }]),
  ],
  controllers: [DreamsController],
  providers: [DreamsService],
})
export class DreamsModule {}
