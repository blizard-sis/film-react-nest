import mongoose, { Mongoose, Schema } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';

const CalendarSchema = new Schema({
  id: String,
  daytime: String,
  hall: String,
  rows: Number,
  seats: Number,
  price: Number,
  taken: [String],
});

const FilmSchema = new Schema({
  id: String,
  rating: Number,
  director: String,
  tags: [String],
  title: String,
  about: String,
  description: String,
  image: String,
  cover: String,
  schedule: [CalendarSchema],
});

@Injectable()
export class FilmsRepository {
  private FilmModel: mongoose.Model<any>;

  constructor(
    @Inject('MONGO_CONNECTION') private readonly connection: Mongoose,
  ) {
    this.FilmModel = this.connection.model('Film', FilmSchema);
  }

  async findAll() {
    const result = await this.FilmModel.find();
    return result;
  }

  async findScheduleByFilmId(filmId: string) {
    const film = await this.FilmModel.findOne({ id: filmId });
    return film?.schedule ?? [];
  }
}
