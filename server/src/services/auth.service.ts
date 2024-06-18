import { validate } from 'class-validator';
import { UserRepository } from '@/repositories/user.repository';
import { RegisterUserDto } from '@/dto/register-user.dto';
import { IUser } from '@/interfaces/IUser.interface';
import { formatErrors } from '@/helpers/formatErrors';
import { SignInUserDto } from '@/dto/sign-in-user.dto';

export class AuthService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async register(registerUserDto: RegisterUserDto): Promise<IUser> {
    const errors = await validate(registerUserDto, {
      whitelist: true,
      validationError: { value: false, target: false },
    });
    if (errors.length) {
      throw formatErrors(errors);
    }
    return await this.repository.register(registerUserDto);
  }

  async signIn(signInUserDto: SignInUserDto): Promise<IUser> {
    return await this.repository.signIn(signInUserDto);
  }
}
