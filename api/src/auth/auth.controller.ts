import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LocalGuard } from 'src/guards/auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth/')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  sigin(@Req() req) {
    console.log(req);
    return this.authService.auth(req.user);
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return this.authService.auth(user);
  }
}
