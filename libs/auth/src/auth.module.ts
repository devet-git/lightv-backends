import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStategy } from './stategies/jwt.stategy';
import { DatabaseModule } from '@database/database';
import { LocalStrategy } from './stategies/local.stategy';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStategy],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
