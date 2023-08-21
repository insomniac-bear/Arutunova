import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

import configuration from 'src/config/config';
import { DatabaseService } from 'src/database/database.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MinioClientModule } from './minio-client/minio-client.module';
import { PhotosModule } from './photos/photos.module';
import { PostModule } from './post/post.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    WinstonModule.forRoot({
      levels: {
        critical_error: 0,
        error: 1,
        special_warning: 2,
        another_log_level: 3,
        info: 4,
      },
      transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
      ],
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseService,
      inject: [DatabaseService],
    }),
    UsersModule,
    AuthModule,
    MinioClientModule,
    PhotosModule,
    PostModule,
    TagModule,
  ],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule {}
