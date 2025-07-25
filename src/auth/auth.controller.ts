import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
import { response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async loginUser(
    @Body() body: loginDto,
    @Res({ passthrough: true }) response,
  ) {
    console.log(body);
    const data = await this.authService.loginUser(body);
    response.cookie('token', data);

    return data;
  }
}
