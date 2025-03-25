import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local.guard';
import { GoogleOAuthGuard } from '../guards/google.guard';
import { ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Request, Response } from 'express';
import { User } from '../entities/user.entity';
import { SigninWithUsernameDto } from '../dtos/signin-with-username.dto';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { UpdateUserOwnInfoDto } from '../dtos/update-user-own-info.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @ApiBody({ type: SigninWithUsernameDto })
  async signinWithUsername(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const response = await this.authService.signinWithUsername(
      req.user as Partial<User>,
    );

    res.cookie('access_token', response.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });

    return response;
  }

  @Post('signup')
  async signupWithUsername(@Body() body: CreateUserDto) {
    if (!body) throw new BadRequestException('No body provided');

    const response = await this.authService.signupWithUsername(body);

    return response;
  }

  @UseGuards(GoogleOAuthGuard)
  @Get('signin/google')
  async signinWithGoogle() {}

  @UseGuards(GoogleOAuthGuard)
  @Get('signin/google/callback')
  async googleAuthRedirect(@Req() req: any, @Res() res: Response) {
    const response = await this.authService.signinWithGoogle(req.user);
    res.cookie('access_token', response.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
    return res.redirect('http://localhost:4200');
  }

  @UseGuards(JwtAuthGuard)
  @Post('signout')
  async signout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return null;
  }

  @UseGuards(JwtAuthGuard)
  @Get('current-user')
  async getCurrentUser(@Req() req: Request) {
    return await this.authService.getCurrentUser(req.cookies['access_token']);
  }

  @UseGuards(JwtAuthGuard)
  @Put('current-user')
  async updateUserOwnInfo(
    @Req() req: Request,
    @Body() data: UpdateUserOwnInfoDto,
  ) {
    const userId = (req.user as User).id;
    return await this.authService.updateUserOwnInfo(userId, data);
  }
}
