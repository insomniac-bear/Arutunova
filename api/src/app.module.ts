import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from 'src/config/config';
import { DatabaseService } from 'src/database/database.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MinioClientModule } from './minio-client/minio-client.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseService,
      inject: [DatabaseService],
    }),
    UsersModule,
    AuthModule,
    MinioClientModule,
  ],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule {}
