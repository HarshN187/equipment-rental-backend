import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/repository/user.repository';
import { loginDto } from './dto/login.dto';
import { DbException, RpcBaseException } from 'src/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

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

    const match: boolean = await bcrypt.compare(
      body.password,
      user[0].password,
    );

    if (!match) {
      throw new RpcBaseException('InValid Credentials', 401);
    }

    const token = this.jwtService.sign({
      email: body.email,
      id: user[0].user_id,
      role: user[0].role,
    });

    return token;
  }
}
