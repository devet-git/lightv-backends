import { AuthService } from './auth.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Request,
  Res,
  Response,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local.guard';
import { GoogleOAuthGuard } from './guards/google.guard';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signinWithUsername(@Request() req: any) {
    return this.authService.signinWithUsername(req.user);
  }

  @Post('signup')
  async signupWithUsername(@Body() body: any) {
    if (!body) throw new BadRequestException('No body provided');

    const { username, password, email } = body;
    const status = await this.authService.signupWithUsername(
      username,
      password,
      email,
    );

    return status
      ? { message: 'User created' }
      : { message: 'User already exists' };
  }

  @UseGuards(GoogleOAuthGuard)
  @Get('signin/google')
  async signinWithGoogle() {}

  @UseGuards(GoogleOAuthGuard)
  @Get('signin/google/callback')
  async googleAuthRedirect(@Request() req: any, @Response() res: any) {
    return await this.authService.signinWithGoogle(req.user);
  }
}
