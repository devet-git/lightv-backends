import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { UpdateUserOwnInfoDto } from '../dtos/update-user-own-info.dto';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
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

  async getCurrentUser(token: string) {
    const payload = this.jwtService.verify(token, {
      secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
    });
    const { username } = payload;
    const user = await this.userRepo.findOne({ where: { username } });

    return user;
  }

  async signinWithUsername(user: Partial<User>) {
    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
  async signinWithGoogle(user: Partial<User>) {
    const { id, username, email } = user;
    let payload = { username, sub: id };
    const existedUser = await this.userRepo.findOne({ where: { email } });

    if (!existedUser) {
      const newUser = this.userRepo.create({
        username,
        email,
        socialProfileProvider: 'google',
      });
      payload.sub = newUser.id;
      await this.userRepo.save(newUser);
    }

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async signupWithUsername(data: CreateUserDto) {
    try {
      const user = await this.userRepo.findOne({
        where: { username: data.username },
      });
      if (user) {
        throw new BadRequestException('User already exists');
      }

      const newUser = this.userRepo.create({
        username: data.username,
        email: data.email,
        password: bcrypt.hashSync(data.password, 10),
      });

      await this.userRepo.save(newUser);

      return {
        username: data.username,
        password: '*********',
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async updateUserOwnInfo(userId: number, data: UpdateUserOwnInfoDto) {
    const currentUser = await this.userRepo.findOne({
      where: { id: userId },
    });
    if (!currentUser) throw new BadRequestException('User not found');

    let updateData: Partial<User> = { email: data.email };

    if (
      data.currentPassword &&
      data.newPassword &&
      (await bcrypt.compare(data.currentPassword, currentUser.password))
    ) {
      updateData.password = bcrypt.hashSync(data.newPassword, 10);
    }

    return await this.userRepo.update(userId, updateData);
  }
}
