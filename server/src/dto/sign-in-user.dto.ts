import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInUserDto {
  @Expose()
  @IsString({ message: 'Имя пользователя должно быть строкой' })
  @IsNotEmpty({ message: 'Укажите имя пользователя' })
    username!: string;
  @Expose()
  @IsString({ message: 'Пароль должен быть строкой' })
  @IsNotEmpty({ message: 'Укажите пароль' })
    password!: string;
}
