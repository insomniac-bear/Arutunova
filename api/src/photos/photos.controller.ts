import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { BufferedFile } from 'src/minio-client/types/minio.interface';
import { JwtGuard } from 'src/guards/jwt.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/const/role.const';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @UseGuards(JwtGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() createPhotoDto: CreatePhotoDto) {
    return this.photosService.create(createPhotoDto);
  }

  @Get()
  findAll() {
    return this.photosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhotoDto: UpdatePhotoDto) {
    return this.photosService.update(+id, updatePhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photosService.remove(+id);
  }

  @UseGuards(JwtGuard)
  @Roles(UserRole.ADMIN)
  @Post('/upload')
  @UseInterceptors(FileInterceptor('gallery'))
  async uploadPhoto(@UploadedFile() image: BufferedFile) {
    const url = await this.photosService.uploadPhoto(image);
    return {
      url,
    };
  }

  @UseGuards(JwtGuard)
  @Roles(UserRole.ADMIN)
  @Delete('/upload/:imageName')
  deletePhoto(@Param() param: { imageName: string }) {
    this.photosService.deletePhoto(param.imageName);
  }
}
