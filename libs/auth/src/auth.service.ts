import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { STATUS_CODES } from 'http';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepo.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
  }

  signin(user: Partial<User>) {
    const payload = { username: user.username, sub: user.id };
    return {
      message: 'User logged in',
      statusCode: 200,
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(username: string, password: string) {
    const user = await this.userRepo.findOne({ where: { username } });
    if (user) {
      return false;
    }

    const newUser = this.userRepo.create({
      username,
      password: bcrypt.hashSync(password, 10),
    });
    await this.userRepo.save(newUser);
    return true;
  }
}
