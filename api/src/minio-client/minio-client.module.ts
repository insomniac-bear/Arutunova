import { Module } from '@nestjs/common';
import { MinioModule } from 'nestjs-minio-client';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MinioClientService } from './minio-client.service';
import { MinioClientController } from './minio-client.controller';

@Module({
  imports: [
    MinioModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        endPoint: configService.get('minio.endPoint'),
        port: configService.get('minio.port'),
        useSSL: false,
        accessKey: configService.get('minio.accessKey'),
        secretKey: configService.get('minio.secretKey'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [MinioClientController],
  providers: [MinioClientService],
})
export class MinioClientModule {}
