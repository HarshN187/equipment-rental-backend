import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRepository } from 'src/user/repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Address } from 'src/user/entities/address.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Address]),
    JwtModule.register({
      secret: 'hard!to-guess_secret',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService, UserRepository],
})
export class AuthModule {}
