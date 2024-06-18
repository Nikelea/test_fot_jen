import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import { User } from '@/entities/user.entity';
import { AppDataSource } from '@/config/dataSource';
import { RegisterUserDto } from '@/dto/register-user.dto';
import { IUser } from '@/interfaces/IUser.interface';
import { SignInUserDto } from '@/dto/sign-in-user.dto';

export class UserRepository extends Repository<User> {
  constructor() {
    super(User, AppDataSource.createEntityManager());
  }

  async register(registerUserDto: RegisterUserDto): Promise<IUser> {
    const salt = await bcrypt.genSalt(10);
    registerUserDto.password = await bcrypt.hash(registerUserDto.password, salt);
    const user = this.create(registerUserDto);
    await this.save(user);

    const userWithoutPassword = _.omit(user, 'password');
    return userWithoutPassword;
  }

  async signIn(signInUserDto: SignInUserDto): Promise<IUser> {
    const user = await this.findOne({
      where: { username: signInUserDto.username },
    });
    if (!user) {
      throw new Error('Invalid username or password');
    }
    const isMatch = await user.comparePassword(signInUserDto.password);
    if (!isMatch) {
      throw new Error('Invalid username or password');
    }

    user.generateToken();
    const userWithToken: IUser = await this.save(user);

    const userWithoutPassword = _.omit(userWithToken, 'password');
    return userWithoutPassword;
  }
}
