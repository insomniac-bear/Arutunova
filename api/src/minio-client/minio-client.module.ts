import { Module } from '@nestjs/common';
import { MinioClientService } from './minio-client.service';
import { MinioClientController } from './minio-client.controller';

@Module({
  controllers: [MinioClientController],
  providers: [MinioClientService]
})
export class MinioClientModule {}
