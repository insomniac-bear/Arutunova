import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BufferedFile } from 'src/minio-client/types/minio.interface';
import { MinioClientService } from 'src/minio-client/minio-client.service';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
    private readonly minioClientService: MinioClientService,
  ) {}

  async uploadPhoto(photo: BufferedFile) {
    const photoUrl = await this.minioClientService.upload('gallery/', photo);
    return photoUrl;
  }

  async deletePhoto(photoName: string) {
    try {
      await this.minioClientService.delete('gallery/', photoName);
    } catch (err) {
      console.log(err);
    }
  }

  create(createPhotoDto: CreatePhotoDto) {
    return this.photoRepository.save(createPhotoDto);
  }

  findAll(limit?: number, skip?: number) {
    if (limit) {
      return this.photoRepository.find({
        take: limit,
        skip,
        order: { createdAt: 'DESC' },
      });
    }

    return this.photoRepository.find();
  }

  findOne(id: number) {
    return this.photoRepository.findOneBy({ id });
  }

  update(id: number, updatePhotoDto: UpdatePhotoDto) {
    return `This action updates a #${id} photo`;
  }

  remove(id: number) {
    return `This action removes a #${id} photo`;
  }
}
