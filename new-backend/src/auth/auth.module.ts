import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AccountModule } from '../account/account.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/account/account.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: true }),
    JwtModule.register({
      // TODO: Move to .env file
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
    TypeOrmModule.forFeature([Account]),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
