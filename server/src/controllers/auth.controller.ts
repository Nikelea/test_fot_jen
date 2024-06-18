import { RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';
import { AuthService } from '@/services/auth.service';
import { RegisterUserDto } from '@/dto/register-user.dto';
import { SignInUserDto } from '@/dto/sign-in-user.dto';

export class AuthController {
  private service: AuthService;

  constructor() {
    this.service = new AuthService();
  }

  register: RequestHandler = async (req, res): Promise<void> => {
    try {
      const registerUserDto = plainToInstance(RegisterUserDto, req.body);
      const user = await this.service.register(registerUserDto);
      res.send({ username: user.username });
    } catch (e) {
      if (Array.isArray(e)) {
        res.status(400).send(e);
      } else if ((e as { code: string }).code === 'ER_DUP_ENTRY') {
        res.send({ error: { message: 'User already exists' } });
      } else {
        res.status(500).send(e);
      }
    }
  };

  signIn: RequestHandler = async (req, res) => {
    try {
      const signInUserDto = plainToInstance(SignInUserDto, req.body);
      const user = await this.service.signIn(signInUserDto);
      return res.setHeader("Authorization", user.token || '').send({ token: user.token });
    } catch (e) {
      return res.status(401).send((e as Error).message);
    }
  };
}
