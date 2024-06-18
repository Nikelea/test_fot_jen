import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TrackDto {
  @IsNotEmpty({ message: 'Укажите номер трека' })
  @IsNumber({}, { message: 'Номер трека должен быть числом' })
  @Expose()
    trackNumber!: number;
    
  @IsNotEmpty({ message: 'Трек не может быть создан без названия' })
  @IsString({ message: 'Название должно быть строкой' })
  @Expose()
    title!: string;

  @IsNotEmpty({ message: 'Укажите продолжительность трека' })
  @IsString({ message: 'Продолжительность трека должна быть строкой' })
  @Expose()
    duration!: string;

  @IsNotEmpty({ message: 'Не указан ID альбома' })
  @IsNumber({}, { message: 'ID альбома должен быть числом' })
  @Expose()
    albumId!: number;
}
