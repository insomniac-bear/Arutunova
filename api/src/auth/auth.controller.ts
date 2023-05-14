import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LocalGuard } from '../guards/auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/const/role.const';

@Controller('auth/')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  sigin(@Req() req) {
    return this.authService.auth(req.user);
  }

  @UseGuards(LocalGuard)
  @Roles(UserRole.ADMIN)
  @Post('admin-signin')
  adminSigin(@Req() req) {
    return this.authService.auth(req.user);
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return this.authService.auth(user);
  }
}
