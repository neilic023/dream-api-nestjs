import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as moment from 'moment';
import { Dream, DreamDocument } from './schema/dreams.schema';
import { Dreams } from './entity/dreams.entity';
import { DreamsDto, DreamsQuery } from './dto/dreams.dto';

@Injectable()
export class DreamsService {
  private readonly logger = new Logger(DreamsService.name);
  constructor(
    @InjectModel(Dream.name)
    private readonly dreamsModel: Model<DreamDocument>,
  ) {}

  async createDream(dreamsDto: DreamsDto): Promise<Dreams> {
    this.logger.verbose(`Creating dream: ${JSON.stringify(dreamsDto)}`);

    const createdDream: DreamDocument = new this.dreamsModel({
      title: dreamsDto.title,
      type: dreamsDto.type,
      description: dreamsDto.description,
      date: moment(dreamsDto.date, ['MM-DD-YYYY', 'DD-MM-YYYY']).format(
        'MM-DD-YYYY',
      ),
    });
    return await createdDream.save();
  }

  async getDreamsByQuery(query: DreamsQuery): Promise<Dreams[]> {
    this.logger.verbose('Getting dreams by query');

    if (!query.title && !query.type) {
      const dreams: Dreams[] = await this.dreamsModel.aggregate([
        {
          $match: {
            date: {
              $gte: moment(query.from, ['MM-DD-YYYY', 'DD-MM-YYYY']).format(
                'MM-DD-YYYY',
              ),
              $lte: moment(query.to, ['MM-DD-YYYY', 'DD-MM-YYYY']).format(
                'MM-DD-YYYY',
              ),
            },
          },
        },
      ]);
      return dreams;
    }

    if (query.title && !query.type && !query.from && !query.to) {
      const dreams = await this.dreamsModel.find({
        title: query.title,
      });
      return dreams;
    }

    return await this.dreamsModel.find({
      type: query.type,
    });
  }

  async getDreamById(id: string): Promise<Dreams> {
    this.logger.verbose(`Getting dream with id: ${id}`);
    try {
      const dream = await this.dreamsModel.findById(id).exec();
      if (!dream) {
        throw new HttpException('Dream not found', HttpStatus.NOT_FOUND);
      }
      return dream;
    } catch (error) {
      throw new HttpException('Dream not found', HttpStatus.NOT_FOUND);
    }
  }

  async updateDream(id: string, dreamsDto: DreamsDto): Promise<Dreams> {
    this.logger.verbose(`Updating dream with id: ${id}`);
    try {
      const dreamToUpdate = await this.dreamsModel.findById(id);
      const date = moment(dreamsDto.date, ['MM-DD-YYYY', 'YYYY-MM-DD']).format(
        'MM-DD-YYYY',
      );
      if (dreamToUpdate.title) {
        dreamToUpdate.title = dreamsDto.title;
      }
      if (dreamToUpdate.description) {
        dreamToUpdate.description = dreamsDto.description;
      }
      if (dreamToUpdate.type) {
        dreamToUpdate.type = dreamsDto.type;
      }
      if (dreamToUpdate.date) {
        dreamToUpdate.date = date;
      }
      return dreamToUpdate.save();
    } catch (error) {
      throw new HttpException('Dream not found', HttpStatus.NOT_FOUND);
    }
  }

  async deleteDream(id: string): Promise<Dreams> {
    this.logger.verbose(`Deleting dream with id: ${id}`);
    try {
      const dream = await this.dreamsModel.findById(id);
      if (!dream) {
        throw new HttpException('Dream not found', HttpStatus.NOT_FOUND);
      }
      return await dream.remove();
    } catch (error) {
      throw new HttpException(
        'Unexpected error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
