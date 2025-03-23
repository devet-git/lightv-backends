import { AuthService } from './auth.service';
import {
  Controller,
  Get,
  Post,
  Request,
  Res,
  Response,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local.guard';
import { GoogleOAuthGuard } from './guards/google.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signinWithUsername(@Request() req: any) {
    return this.authService.signinWithUsername(req.user);
  }

  @Post('signup')
  async signupWithUsername(@Request() req: any) {
    const { username, password, email } = req.body;
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
