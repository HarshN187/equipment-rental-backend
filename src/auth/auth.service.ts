import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/repository/user.repository';
import { loginDto } from './dto/login.dto';
import { DbException, RpcBaseException } from 'src/common/exceptions';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async loginUser(body: loginDto) {
    const user = await this.userRepo.allAsync({ email: body.email });

    if (!user) {
      throw new DbException('User Not Found');
    }

    if (user[0].password != body.password) {
      throw new RpcBaseException('INValid Credentials', 401);
    }

    const token = this.jwtService.sign({
      email: body.email,
      id: user[0].user_id,
    });

    return token;
  }
}
