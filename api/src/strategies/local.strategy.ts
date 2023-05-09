import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/auth/auth.service';
import { ErrorCode } from 'src/exceptions/error-codes';
import { ServerException } from 'src/exceptions/server.exception';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validatePassword(email, password);

    if (!user) {
      throw new ServerException(ErrorCode.AccessDenied);
    }

    return user;
  }
}
