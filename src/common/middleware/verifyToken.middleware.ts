import { HttpStatus, NestMiddleware, Next, Req, Res } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { RpcBaseException } from '../exceptions';

// @Injectable()
export class VeryfyTokenMiddleware implements NestMiddleware {
  private jwtService: JwtService;
  constructor() {
    this.jwtService = new JwtService({
      secret: 'hard!to-guess_secret',
      signOptions: { expiresIn: '24h' },
    });
  }

  use(@Req() req, @Res() res, @Next() next) {
    let token;
    if (req.headers.authorization) {
      token = req.headers.authorization.split(' ');
      try {
        const userData = this.jwtService.verify(token[1]);
        req.user = userData;
        next();
      } catch (err) {
        res.json(
          new RpcBaseException('Invalid token', HttpStatus.UNAUTHORIZED),
        );
      }
    } else {
      return res.json(
        new RpcBaseException(
          'user in not authenticated',
          HttpStatus.UNAUTHORIZED,
        ),
      );
    }
    const jwtToken = token[1];
  }
}
