import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AlbumDto {
  @IsNotEmpty({ message: 'Альбом не может быть создан без названия' })
  @IsString({ message: 'Название должно быть строкой' })
  @Expose()
    title!: string;

  @IsNotEmpty({ message: 'Укажите год выпуска альбома' })
  @IsNumber({}, { message: 'Год выпуска альбома должен быть числом' })
  @Expose()
    releaseYear!: number;

  @IsNotEmpty({ message: 'Укажите ссылку на изображение обложки альбома' })
  @IsString({ message: 'Ссылка на изображение обложки альбома должна быть строкой' })
  @Expose()
    coverImage!: string;

  @IsNotEmpty({ message: 'Не указан исполнитель альбома' })
  @IsNumber({}, { message: 'ID исполнителя должен быть числом' })
  @Expose()
    artistId!: number;
}
