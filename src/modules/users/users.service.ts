import {
  Inject,
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { hash } from 'bcryptjs';

import { CreateUserDto, UpdateUserDto } from './dto';
import { IUsersRepository } from './repositories';
import { USERS_PROVIDERS_TOKENS } from './users.providers';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_PROVIDERS_TOKENS.UsersRepository)
    private usersRepository: IUsersRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, name, password } = createUserDto;

    const emailIsUsed = await this.usersRepository.findOneByEmail(email);
    if (emailIsUsed) throw new ConflictException('Email already registered');

    const passwordHash = await hash(password, 8);

    return await this.usersRepository.create({
      name,
      email,
      passwordHash,
    });
  }

  async findAll() {
    return await this.usersRepository.findAll();
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOneById(id);

    if (!user) throw new NotFoundException(`User not found`);

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneById(id);
    if (!user) throw new NotFoundException(`User not found`);

    const { email, name, password } = updateUserDto;

    if (email && email !== user.email) {
      const emailIsUsed = await this.usersRepository.findOneByEmail(email);
      if (emailIsUsed) throw new ConflictException('Email already registered');
    }

    let passwordHash;
    if (password) passwordHash = await hash(password, 8);

    return await this.usersRepository.update(id, {
      email,
      name,
      passwordHash,
    });
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOneById(id);
    if (!user) throw new NotFoundException(`User not found`);

    return await this.usersRepository.delete(id);
  }
}
