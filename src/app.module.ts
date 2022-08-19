import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DreamsModule } from './dreams/dreams.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.dev.env',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    DreamsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
