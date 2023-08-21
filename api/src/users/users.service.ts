import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRole } from 'src/const/role.const';
import { ServerException } from 'src/exceptions/server.exception';
import { ErrorCode } from 'src/exceptions/error-codes';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    return bcrypt.hash(createUserDto.password, 10).then((hashed) =>
      this.userRepository.save({
        ...createUserDto,
        password: hashed,
        roles: UserRole.USER,
      }),
    );
  }

  async createAdmin(createUserDto: CreateUserDto) {
    return bcrypt.hash(createUserDto.password, 10).then((hashed) =>
      this.userRepository.save({
        ...createUserDto,
        password: hashed,
        roles: UserRole.ADMIN,
      }),
    );
  }

  findAll() {
    return this.userRepository.find();
  }

  findById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const candidate = await this.findById(id);
    if (!candidate) {
      throw new ServerException(ErrorCode.UserNotFound);
    }

    return this.userRepository.save(updateUserDto);
  }

  async remove(id: number) {
    const candidate = await this.findById(id);
    if (!candidate) {
      throw new ServerException(ErrorCode.UserNotFound);
    }

    return this.userRepository.remove(candidate);
  }
}
