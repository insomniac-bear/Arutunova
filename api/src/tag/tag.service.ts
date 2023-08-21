import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';
import { ServerException } from 'src/exceptions/server.exception';
import { ErrorCode } from 'src/exceptions/error-codes';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto) {
    const candidate = await this.tagRepository.findOneBy({
      name: createTagDto.name,
    });
    if (candidate) {
      throw new ServerException(ErrorCode.TagAlreadyExist);
    }

    return await this.tagRepository.create(createTagDto);
  }

  findAll() {
    return this.tagRepository.find();
  }

  findOne(id: number) {
    return this.tagRepository.findOneBy({ id });
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    const tag = await this.findOne(id);
    if (!tag) {
      throw new ServerException(ErrorCode.TagNotFound);
    }
    return this.tagRepository.update(tag, updateTagDto);
  }

  async remove(id: number) {
    const tag = await this.findOne(id);
    if (!tag) {
      throw new ServerException(ErrorCode.TagNotFound);
    }
    return this.tagRepository.remove(tag);
  }
}
