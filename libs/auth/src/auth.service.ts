import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.userRepo.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result as Omit<User, 'password'>;
    }
    return null;
  }

  signinWithUsername(user: Partial<User>) {
    const payload = { username: user.username, sub: user.id };
    return {
      message: 'User logged in',
      statusCode: 200,
      accessToken: this.jwtService.sign(payload),
    };
  }
  async signinWithGoogle(user: Partial<User>) {
    const { id, username, email } = user;
    const payload = { username, sub: id };
    const existedUser = await this.userRepo.findOne({
      where: { email },
    });

    if (!existedUser) {
      const newUser = this.userRepo.create({
        username,
        email,
        social_profile: 'google',
      });
      await this.userRepo.save(newUser);
    }

    return {
      message: 'User logged in',
      statusCode: 200,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async signupWithUsername(
    username: string,
    password: string,
    email: string | undefined,
  ) {
    try {
      const user = await this.userRepo.findOne({ where: { username } });
      if (user) return false;

      const newUser = this.userRepo.create({
        username,
        email,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepo.save(newUser);

      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }
}
