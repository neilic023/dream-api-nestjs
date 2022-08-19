import { IsNotEmpty, IsString, IsEnum, Matches } from 'class-validator';
import { Types } from '../schema/dreams.schema';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

class BaseDreamsDto {
  @ApiProperty({
    type: String,
    description: "Dream's title",
    example: 'Happy dream',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    type: String,
    description: "Dream's type",
    example: 'happy',
  })
  @IsNotEmpty()
  @IsEnum(Types)
  @IsString()
  type: Types;
}

export class DreamsDto extends BaseDreamsDto {
  @Matches(/^(\d{4})\-(\d{2})\-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})$/i, {
    message: '$property must be formatted as yyyy-mm-dd',
  })
  @IsNotEmpty()
  @ApiProperty({
    type: Date,
    description: "Dream's date in ISO8601 format",
    example: '2020-01-01',
  })
  date: Date;
}

export class BaseDreamsQuery extends BaseDreamsDto {
  // @Matches(/^(\d{4})\-(\d{2})\-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})$/i, {
  //   message: '$property must be formatted as yyyy-mm-dd',
  // })
  from: Date;
  // @Matches(/^(\d{4})\-(\d{2})\-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})$/i, {
  //   message: '$property must be formatted as yyyy-mm-dd',
  // })
  to: Date;
}

export class DreamsQuery extends PartialType(BaseDreamsQuery) {}
