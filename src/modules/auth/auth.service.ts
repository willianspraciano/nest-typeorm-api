import { Inject, Injectable } from '@nestjs/common';
import { compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { IUsersRepository } from '@modules/users/repositories';
import { USERS_PROVIDERS_TOKENS } from '@modules/users/users.providers';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(USERS_PROVIDERS_TOKENS.UsersRepository)
    private readonly usersRepository: IUsersRepository,
  ) {}

  async login(user) {
    const payload = { sub: user.id, email: user.email };

    return {
      user,
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOneByEmail(email);
    if (!user) return null;

    const isPasswordValid = compareSync(password, user.passwordHash);
    if (!isPasswordValid) return null;

    return user;
  }
}
