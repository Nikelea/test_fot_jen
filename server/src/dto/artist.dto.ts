import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class ArtistDto {
  @IsNotEmpty({ message: 'Исполнитель не может быть создан без имени' })
  @IsString({ message: 'Имя должно быть строкой' })
  @Expose()
    name!: string;

  @IsNotEmpty({ message: 'Укажите ссылку на фото исполнителя' })
  @IsString({ message: 'Ссылка на фото исполнителя должна быть строкой' })
  @Expose()
    photo!: string;

  @IsNotEmpty({ message: 'Укажите информацию об исполнителе' })
  @IsString({ message: 'Информация об исполнителе должна быть строкой' })
  @Expose()
    information!: string;
}
