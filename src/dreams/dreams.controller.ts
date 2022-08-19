import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Put,
  Delete,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { DreamsService } from './dreams.service';
import {
  ApiBody,
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';
import { DreamsDto, DreamsQuery } from './dto/dreams.dto';
import { Types } from './schema/dreams.schema';

@ApiTags('dreams')
@Controller('dreams')
export class DreamsController {
  constructor(private readonly dreamsService: DreamsService) {}

  @Post()
  @ApiOkResponse({ type: DreamsDto })
  @ApiOperation({
    summary: 'Creates a dream in a db',
  })
  async createDream(@Body() dreamsDto: DreamsDto) {
    const response = await this.dreamsService.createDream(dreamsDto);
    return response;
  }

  @ApiOkResponse({ type: DreamsDto })
  @ApiOperation({
    summary: 'Executes the dreams query',
  })
  @Get()
  async getDreamsByQuery(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query: DreamsQuery,
  ) {
    const response = await this.dreamsService.getDreamsByQuery(query);
    return response;
  }

  @ApiOkResponse({ type: DreamsDto })
  @ApiOperation({
    summary: 'Returns dream by mongo id',
  })
  @Get(':id')
  async getDreamById(@Param('id') id: string) {
    const response = await this.dreamsService.getDreamById(id);
    return response;
  }

  @ApiOkResponse({ type: DreamsDto })
  @ApiOperation({
    summary: 'Updates the dream by id',
  })
  @ApiBody({ type: DreamsDto })
  @Put(':id')
  async updateDreamById(@Param('id') id: string, @Body() dreamsDto: DreamsDto) {
    const response = await this.dreamsService.updateDream(id, dreamsDto);
    return response;
  }

  @ApiOperation({
    summary: 'Deletes the dream by id',
  })
  @Delete(':id')
  async deleteDream(@Param('id') id: string) {
    await this.dreamsService.deleteDream(id);
    return { deleted: true };
  }

  @ApiOperation({
    summary: 'Returns dream types',
  })
  @Get('types')
  getDreamTypes(): Types[] {
    return Object.values(Types);
  }
}
