import mongoose, { Mongoose, Schema, Document } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';

import { FilmDto, ScheduleDto } from '../films/dto/films.dto';

import { IFilmsRepository } from './films.repository.interface';

interface Session {
  id: string;
  daytime: string;
  hall: string;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

interface FilmDocument extends Document {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  title: string;
  about: string;
  description: string;
  image: string;
  cover: string;
  schedule: Session[];
}

const SessionSchema = new Schema<Session>({
  id: String,
  daytime: String,
  hall: String,
  rows: Number,
  seats: Number,
  price: Number,
  taken: [String],
});

const FilmSchema = new Schema<FilmDocument>({
  id: String,
  rating: Number,
  director: String,
  tags: [String],
  title: String,
  about: String,
  description: String,
  image: String,
  cover: String,
  schedule: [SessionSchema],
});

@Injectable()
export class MongoRepository implements IFilmsRepository {
  private FilmModel: mongoose.Model<FilmDocument>;

  constructor(
    @Inject('MONGO_CONNECTION') private readonly connection: Mongoose,
  ) {
    this.FilmModel = this.connection.model<FilmDocument>('Film', FilmSchema);
  }

  async findAll() {
    return this.FilmModel.find();
  }

  async findById(id: string) {
    return this.FilmModel.findOne({ id });
  }

  async findScheduleByFilmId(filmId: string) {
    const film = await this.FilmModel.findOne({ id: filmId });
    return film?.schedule ?? [];
  }

  async saveFilm(filmDto: FilmDto & { schedule: ScheduleDto[] }) {
    const existing = await this.FilmModel.findOne({ id: filmDto.id });
    if (existing) {
      await existing.overwrite(filmDto).save();
    } else {
      throw new Error('Film not found');
    }
  }
}
