import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class TrackHistoryDto {
  @Expose()
  @IsNumber({}, { message: 'ID трека должен быть числом' })
  @IsNotEmpty({ message: 'Укажите ID трека' })
    track!: number;
}
