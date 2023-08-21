import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { ServerException } from 'src/exceptions/server.exception';
import { ErrorCode } from 'src/exceptions/error-codes';
import { BufferedFile } from 'src/minio-client/types/minio.interface';
import { MinioClientService } from 'src/minio-client/minio-client.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private readonly minioClientService: MinioClientService,
  ) {}

  async uploadPhoto(photo: BufferedFile) {
    const photoUrl = await this.minioClientService.upload('posts/', photo);
    return photoUrl;
  }

  create(createPostDto: CreatePostDto) {
    return this.postRepository.create(createPostDto);
  }

  findAll() {
    return this.postRepository.find();
  }

  findOne(id: number) {
    return this.postRepository.findOneBy({ id });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.findOne(id);
    if (!post) {
      throw new ServerException(ErrorCode.PostNotFound);
    }

    return this.postRepository.update(post, updatePostDto);
  }

  async remove(id: number) {
    const post = await this.findOne(id);
    if (!post) {
      throw new ServerException(ErrorCode.PostNotFound);
    }

    return this.postRepository.remove(post);
  }
}
