import { AuthService } from './auth.service';
import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Request() req: any) {
    return this.authService.signin(req.user);
  }

  @Post('signup')
  async signup(@Request() req: any) {
    const { username, password } = req.body;
    const status = await this.authService.signup(username, password);

    return status
      ? { message: 'User created' }
      : { message: 'User already exists' };
  }
}
